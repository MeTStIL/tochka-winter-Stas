import type {Player} from "../types/game.ts";
import {GameMode, type GameModeType} from "../constants.ts";


function getPlayerName(player: Player, gameMode: GameModeType) {
    if (gameMode === GameMode.HotChair) {
        return player === 'player_1' ?  'Игрок 1 🔴' : 'Игрок 2 🟡';
    }

    return player === 'player_1' ? 'Игрок 🔴' : 'Бот 🟡';
}

export default getPlayerName;
