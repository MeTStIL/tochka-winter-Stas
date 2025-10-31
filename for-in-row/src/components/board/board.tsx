import type {CellStatus, Player} from "../../types/game.ts";
import './board.css'
import Cell from "../cell/cell.tsx";
import {useState} from "react";
import {GameStatus, type GameStatusType} from "../../constants.ts";

type BoardProps = {
    board: CellStatus[][];
    onColumnClick: (columnNumber: number) => void;
    currentPlayer: Player;
    gameStatus: GameStatusType;
    winningCells: [number, number][];
    lastCords: [number, number] | null;
}


function Board({board, onColumnClick, currentPlayer, gameStatus, winningCells, lastCords}: BoardProps) {
    const [hoveredCell, setHoveredCell] = useState<null | number>(null);

    const previewRow = hoveredCell !== null
        ? board.map(row => row[hoveredCell]).lastIndexOf(null)
        : null;

    return (
        <>
            <div className='board'>
                {board.map((row, rowIdx) => (
                    <div key={rowIdx} className={'board-row'}>
                        {row.map((cell, colIdx) => {

                            const isWinningCellFlag = winningCells.filter(([r, c]) => r === rowIdx && c === colIdx).length > 0;
                            const isLatest = lastCords ? lastCords[0] === rowIdx && lastCords[1] === colIdx : false;

                            return (
                                <Cell key={colIdx}
                                      value={cell}
                                      showPreview={gameStatus === GameStatus.InProgress && hoveredCell === colIdx && previewRow === rowIdx}
                                      previewPlayer={currentPlayer}
                                      onClick={() => onColumnClick(colIdx)}
                                      onMouseEnter={() => setHoveredCell(colIdx)}
                                      onMouseLeave={() => setHoveredCell(null)}
                                      isWinningCell={isWinningCellFlag}
                                      isLatest={isLatest}
                                />
                            );

                        })}
                    </div>
                ))}

            </div>
        </>
    )
}

export default Board;
