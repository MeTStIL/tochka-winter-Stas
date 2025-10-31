import {GameMode, GameStatus} from "../../constants.ts";
import type {GameModeType, GameStatusType, Player} from "../../types/game.ts";


function playerCanMakeMove(gameMode: GameModeType, currentPlayer: Player, gameStatus: GameStatusType) {
    if (gameMode === GameMode.Bot) {
        if (currentPlayer === 'player_2') {
            return false;
        }
    }

    return gameStatus === GameStatus.InProgress;

}

export default playerCanMakeMove;
