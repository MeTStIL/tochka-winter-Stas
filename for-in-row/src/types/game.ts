

export type Player = 'player_1' | 'player_2';

export type CellStatus = Player | null;

export type BoardType = CellStatus[][];

export type GameResult = {
    id: number,
    winner: Player | 'draw',
}

