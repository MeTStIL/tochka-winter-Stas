import type {BoardType, Player} from "../types/game.ts";
import {BoardSize, GameStatus, type GameStatusType} from "../constants.ts";
import {useState} from "react";
import Board from "../components/board/board.tsx";

type GameProps = {
    status: GameStatusType,
}

function Game({status}: GameProps) {
    const emptyBoard: BoardType = Array.from({length: BoardSize.Rows}, () => Array(BoardSize.Columns).fill(null));

    const [currentPlayer, setCurrentPlayer] = useState<Player>('player_1');
    const [board, setBoard] = useState<BoardType>(emptyBoard);
    const [winner, setWinner] = useState<null | Player>(null);

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
        }

        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'player_1' ? 'player_2' : 'player_1');
    }

    const handleEndGame = () => {
        alert('Игра закончена - перезапустите');
    }

    return (
        <>
            <h1>Текущий игрок: {currentPlayer}</h1>
            <Board board={board}
                   onColumnClick={status === GameStatus.InProgress ? handleColumnClick : handleEndGame}
                   currentPlayer={currentPlayer}/>
        </>
    );
}

export default Game;



