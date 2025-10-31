import type {BoardType} from "../types/game.ts";
import {BoardSize} from "../constants.ts";

function makeBotMove(board: BoardType) {
    const available = [];
    for (let column = 0; column < BoardSize.Columns; column++) {
        if (board[0][column] === null) {
            available.push(column);
        }
    }

    if (available.length === 0) {
        return;
    }

    return available[Math.floor(Math.random() * available.length)];
}

export default makeBotMove;
