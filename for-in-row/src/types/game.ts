import {GameMode, GameStatus} from "../constants.ts";


export type Player = 'player_1' | 'player_2';

export type CellStatus = Player | null;

export type BoardType = CellStatus[][];

export type GameResult = {
    id: number,
    winner: Player | 'draw',
}

export type GameStatusType = typeof GameStatus[keyof typeof GameStatus];
export type GameModeType = typeof GameMode[keyof typeof GameMode];

export type GameState = {
    currentPlayer: Player,
    board: BoardType,
    winner: Player | null,
    gameStatus: GameStatusType,
    winningCells: [number,number][],
    gameHistory: GameResult[],
    gameId: number,
    lastCords: [number, number] | null,
}

export type GameLogic = {
    gameState: GameState,
    handleColumnClick: (column: number) => void,
    handleEndGame: () => void,
    handleRestartGame: () => void,
    handleResetAll: () => void,
    highlightRestart: boolean,
}
