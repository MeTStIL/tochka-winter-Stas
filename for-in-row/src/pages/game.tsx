import type {BoardType, Player} from "../types/game.ts";
import {BoardSize, GameStatus, type GameStatusType} from "../constants.ts";
import {useState} from "react";
import Board from "../components/board/board.tsx";
import {checkWin} from "../utils/check-win.ts";
import {getGameHeader} from "../utils/get-game-header.tsx";
import './game.css'


function Game() {
    const emptyBoard: BoardType = Array.from({length: BoardSize.Rows}, () => Array(BoardSize.Columns).fill(null));

    const [currentPlayer, setCurrentPlayer] = useState<Player>('player_1');
    const [board, setBoard] = useState<BoardType>(emptyBoard);
    const [winner, setWinner] = useState<null | Player>(null);
    const [gameStatus, setGameStatus] = useState<GameStatusType>(GameStatus.InProgress);
    const [winningCells, setWinningCells] = useState<number[][]>([]);

    const handleColumnClick = (column: number) => {
        if (winner) {
            return;
        }

        const newBoard = board.map((row) => [...row]);
        let flag = false;
        for (let row = BoardSize.Rows - 1; row >= 0; row--) {
            if (newBoard[row][column] === null) {
                newBoard[row][column] = currentPlayer;
                flag = true;
                break;
            }
        }

        if (!flag){
            alert('ЗАНЯТО НАХУ')
            return;
        }

        const winnerInfo = checkWin(newBoard, currentPlayer);

        if (!winnerInfo) {
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'player_1' ? 'player_2' : 'player_1');
        } else if (winnerInfo.player === GameStatus.Draw) {
            setGameStatus(GameStatus.Draw);
            setBoard(newBoard);
            alert('Ничья!');
            return;
        } else if (winnerInfo.player === GameStatus.SomebodyWins) {
            setWinner(currentPlayer);
            setWinningCells(winnerInfo.winPositions);
            setBoard(newBoard);
            setGameStatus(GameStatus.SomebodyWins);
            return;
        }
    }

    const handleEndGame = () => {
        alert('Игра закончена - перезапустите');
    }

    const handleRestartGame = () => {
        setCurrentPlayer('player_1');
        setBoard(emptyBoard);
        setWinner(null);
        setGameStatus(GameStatus.InProgress);
        setWinningCells([]);
    }

    return (
        <>
            <h1>{getGameHeader(gameStatus, currentPlayer)}</h1>
            <Board board={board}
                   onColumnClick={gameStatus === GameStatus.InProgress ? handleColumnClick : handleEndGame}
                   currentPlayer={currentPlayer}
                   gameStatus={gameStatus}
                   winningCells={winningCells}
            />

            <button className='restart-btn' onClick={handleRestartGame}>
                Перезапустить игру
            </button>
        </>
    );
}

export default Game;



