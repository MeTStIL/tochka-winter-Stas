import {type GameModeType, GameStatus, type GameStatusType} from "../constants.ts";
import type {Player} from "../types/game.ts";
import getPlayerName from "./get-player-name.ts";


export function getGameHeader(gameStatus: GameStatusType, currentPlayer: Player, gameMode: GameModeType) {

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
                    Сейчас ходит:&nbsp;
                    <strong>
                        {getPlayerName(currentPlayer, gameMode)}
                    </strong>
                </span>
            );
        case GameStatus.SomebodyWins:
            return (
                <span className={`game-header somebody-win ${currentPlayer}`}>
                    Победу одержал:&nbsp;
                    <strong>
                        {getPlayerName(currentPlayer, gameMode)}
                    </strong>
                </span>
            );
    }
}
