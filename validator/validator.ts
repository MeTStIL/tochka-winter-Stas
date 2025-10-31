import {BoardType, Player} from "../for-in-row/src/types/game";
import {BoardSize, GameStatus} from "../for-in-row/src/constants";
import {checkWin} from "../for-in-row/src/utils/game/check-win";

type validatorBoardState = 'waiting' | 'pending' | 'win' | 'draw';

type validatorInfo = {
    player_1: [number, number][],
    player_2: [number, number][],
    board_state: validatorBoardState,
    winner?: {
        who: Player,
        positions: number[][],
    }
}

type validatorResult = {
    [key: string]: validatorInfo;
}

function validator(moves: number[]): validatorResult {
    const result: validatorResult = {};

    result['step_0'] = {
        player_1: [],
        player_2: [],
        board_state: 'waiting'
    }

    const board: BoardType = Array.from({length: BoardSize.Rows}, () => Array(BoardSize.Columns).fill(null));

    for (let move = 0; move < moves.length; move++) {

        const currentPlayer: Player = move % 2 === 0 ? 'player_1' : 'player_2';
        const placedColumn = moves[move];
        let placedRow = -1;

        for (let row = BoardSize.Rows - 1; row >= 0; row--) {
            if (board[row][placedColumn] === null) {
                board[row][placedColumn] = currentPlayer;
                placedRow = row;
                break;
            }
        }

        const prevStep = result[`step_${move}`];
        const player1Cords = [...prevStep.player_1];
        const player2Cords = [...prevStep.player_2];

        if (currentPlayer === 'player_1') {
            player1Cords.push([placedRow, placedColumn]);
        } else {
            player2Cords.push([placedRow, placedColumn]);
        }

        const winnerInfo = checkWin(board, currentPlayer);

        let boardState: validatorBoardState = 'pending';
        let winner: validatorInfo['winner'] | null;

        if (winnerInfo?.player === GameStatus.Draw) {
            boardState = 'draw';
        } else if (winnerInfo?.player === GameStatus.SomebodyWins) {
            boardState = 'win';
            winner = {
                who: currentPlayer,
                positions: winnerInfo.winPositions,
            }
        }

        result[`step_${move + 1}`] = {
            player_1: player1Cords,
            player_2: player2Cords,
            board_state: boardState,
            ...(winner && {winner})
        }

    }

    return result;
}

console.dir(validator([0, 1, 1, 2, 4, 2, 2, 3, 4, 3, 5, 3, 3]), {depth: null})
