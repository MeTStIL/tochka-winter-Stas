import type {CellStatus, Player} from "../../types/game.ts";
import './board.css'
import Cell from "../cell/cell.tsx";
import {useState} from "react";

type BoardProps = {
    board: CellStatus[][];
    onColumnClick: (columnNumber: number) => void;
    currentPlayer: Player;
}


function Board({board, onColumnClick, currentPlayer}: BoardProps) {
    const [hoveredCell, setHoveredCell] = useState<null | number>(null);

    const previewRow = hoveredCell !== null
        ? board.map(row => row[hoveredCell]).lastIndexOf(null)
        : null;

    return (
        <>
            <div className='board'>
                {board.map((row, rowIdx) => (
                    <div key={rowIdx} className={'board-row'}>
                        {row.map((cell, colIdx) => (
                            <Cell key={colIdx}
                                  value={cell}
                                  showPreview={hoveredCell === colIdx && previewRow === rowIdx}
                                  previewPlayer={currentPlayer}
                                  onClick={() => onColumnClick(colIdx)}
                                  onMouseEnter={() => setHoveredCell(colIdx)}
                                  onMouseLeave={() => setHoveredCell(null)}
                            />
                        ))}
                    </div>
                ))}

            </div>
        </>
    )
}

export default Board;
