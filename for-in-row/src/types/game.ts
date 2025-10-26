

export type Player = 'player_1' | 'player_2';

export type CellStatus = Player | null;

export interface WinnerInfo {
    player: Player;
    pos: [number, number][];
}
