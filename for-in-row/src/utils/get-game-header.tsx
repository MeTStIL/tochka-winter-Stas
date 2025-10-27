import {GameStatus, type GameStatusType} from "../constants.ts";
import type {Player} from "../types/game.ts";


export function getGameHeader(gameStatus: GameStatusType, currentPlayer: Player) {
    switch (gameStatus) {
        case GameStatus.Draw:
            return (
                <span className='game-header draw'>
                    Ничья!
                </span>
            );
        case GameStatus.InProgress:
            return (
                <span className={`game-header in-progress ${currentPlayer}`}>
                    Сейчас ходит:
                    <strong>
                        {currentPlayer === 'player_1' ? ' Игрок 1 🔴' : ' Игрок 2🟡'}
                    </strong>
                </span>
            );
        case GameStatus.SomebodyWins:
            return (
                <span className={`game-header somebody-win ${currentPlayer}`}>
                    Победу одержал:
                    <strong>
                        {currentPlayer === 'player_1' ? ' Игрок 1 🔴' : ' Игрок 2🟡'}
                    </strong>
                </span>
            );
    }
}
