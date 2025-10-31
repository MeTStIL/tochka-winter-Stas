import type {BoardType, Player} from "../types/game.ts";
import {BoardSize, GameStatus} from "../constants.ts";

const directions = [
    [0, 1],
    [1, 0],
    [1, -1],
    [1, 1]
]


export function checkWin(board: BoardType, currentPlayer: Player) {
    for (let row = 0; row < BoardSize.Rows; row++) {
        for (let column = 0; column < BoardSize.Columns; column ++) {
            if (board[row][column] !== currentPlayer) {
                continue;
            }

            for (const [dr, dc] of directions) {
                const winPositions: [number, number][] = [[row, column]];

                for (let i = 1; i < 4; i++) {
                    const [r, c] = [row + dr * i, column + dc * i];

                    if (
                        r < 0 || c < 0 ||
                        r >= BoardSize.Rows || c >= BoardSize.Columns ||
                        board[r][c] !== currentPlayer
                    ) {
                        break;
                    }

                    winPositions.push([r, c])

                }

                if (winPositions.length === 4) {
                    return {
                        player: GameStatus.SomebodyWins,
                        winPositions: winPositions,
                    }
                }
            }

        }

    }

    if (board.flat().every((cell) => cell !== null)) {
        return { player: GameStatus.Draw };
    }
    return null;

}
