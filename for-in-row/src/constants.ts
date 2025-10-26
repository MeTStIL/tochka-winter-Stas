export const AppRoute = {
    Main: '/',
    Game: '/game',
    Secret: '/pasxalko'
} as const;

export const PlayersColor = {
    Player1: 'rgb(255, 0, 0)',
    Player2: 'rgb(255, 255, 0)',
    NoPlayer: 'rgb(255, 255, 255)',
} as const;

export const CellPreviewColor = {
    Player1: 'rgba(255, 0, 0, 0.6)',
    Player2: 'rgba(255, 255, 0, 0.6)',
    NoPlayer: 'transparent',
} as const;

export const BoardSize = {
    Rows: 6,
    Columns: 7,
} as const;

export const GameStatus = {
    InProgress: 'inProgress',
    End: 'End',
} as const;

export type GameStatusType = typeof GameStatus[keyof typeof GameStatus];
