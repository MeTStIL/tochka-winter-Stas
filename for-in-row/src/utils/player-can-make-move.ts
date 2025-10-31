import {GameMode, type GameModeType, GameStatus, type GameStatusType} from "../constants.ts";
import type {Player} from "../types/game.ts";


function playerCanMakeMove(gameMode: GameModeType, currentPlayer: Player, gameStatus: GameStatusType) {
    if (gameMode === GameMode.Bot) {
        if (currentPlayer === 'player_2') {
            return false;
        }
    }

    return gameStatus === GameStatus.InProgress;

}

export default playerCanMakeMove;
