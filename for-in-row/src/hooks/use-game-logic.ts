import type {BoardType, GameLogic, GameModeType, GameState} from "../types/game.ts";
import {
    BoardSize,
    GameMode,
    GameStatus,
    LOCAL_STORAGE_KEY,
} from "../constants.ts";
import {useLocalStorage} from "./use-local-storage.ts";
import {useEffect, useState} from "react";
import makeBotMove from "../utils/game/make-bot-move.ts";
import {checkWin} from "../utils/game/check-win.ts";


export function useGameLogic(gameMode: GameModeType): GameLogic {
    const emptyBoard: BoardType = Array.from({length: BoardSize.Rows}, () => Array(BoardSize.Columns).fill(null));

    const [highlightRestart, setHighlightRestart] = useState(false);

    const [gameState, setGameState] = useLocalStorage<GameState>(LOCAL_STORAGE_KEY, {
        currentPlayer: 'player_1',
        board: emptyBoard,
        winner: null,
        gameStatus: GameStatus.InProgress,
        winningCells: [],
        gameHistory: [],
        gameId: 1,
        lastCords: null
    });


    useEffect(() => {
        if (gameState.gameStatus !== GameStatus.InProgress) {
            handleEndGame();
        }
    }, [gameState.gameStatus]);

    useEffect(() => {
        if (gameMode !== GameMode.Bot || gameState.currentPlayer !== 'player_2') {
            return;
        }

        if (gameState.gameStatus !== GameStatus.InProgress || gameState.winner) {
            return;
        }

        const botChoose = makeBotMove(gameState.board);
        if (botChoose === undefined) {
            return;
        }

        const timer = setTimeout(() => {
            handleColumnClick(botChoose);
        }, 800);

        return () => clearTimeout(timer);
    }, [gameState.currentPlayer, gameState.gameStatus]);


    const handleColumnClick = (column: number) => {
        setGameState(prev => {
            if (prev.winner || prev.gameStatus !== GameStatus.InProgress) return prev;

            const newBoard = prev.board.map(row => [...row]);
            let placedRow = -1;

            for (let row = BoardSize.Rows - 1; row >= 0; row--) {
                if (newBoard[row][column] === null) {
                    newBoard[row][column] = prev.currentPlayer;
                    placedRow = row;
                    break;
                }
            }

            if (placedRow === -1){
                return prev;
            }

            const winnerInfo = checkWin(newBoard, prev.currentPlayer);

            if (winnerInfo && winnerInfo.player === GameStatus.Draw) {
                return {
                    ...prev,
                    board: newBoard,
                    lastCords: [placedRow, column],
                    gameStatus: GameStatus.Draw,
                    gameHistory: [
                        ...prev.gameHistory,
                        { id: prev.gameId, winner: GameStatus.Draw },
                    ],
                    gameId: prev.gameId + 1,
                };
            }

            if (winnerInfo) {
                return {
                    ...prev,
                    board: newBoard,
                    lastCords: [placedRow, column],
                    gameStatus: GameStatus.SomebodyWins,
                    winner: prev.currentPlayer,
                    winningCells: winnerInfo.winPositions,
                    gameHistory: [
                        ...prev.gameHistory,
                        { id: prev.gameId, winner: prev.currentPlayer },
                    ],
                    gameId: prev.gameId + 1,
                };
            }

            return {
                ...prev,
                board: newBoard,
                lastCords: [placedRow, column],
                currentPlayer: prev.currentPlayer === 'player_1' ? 'player_2' : 'player_1',
            };
        });
    };


    const handleEndGame = () => {
        setHighlightRestart(true);
        setTimeout(() => setHighlightRestart(false), 800);
    }

    const handleRestartGame = () => {
        setGameState((prevState) => (
            {
                ...prevState,
                currentPlayer: prevState.gameId % 2 === 0 ? 'player_2' : 'player_1',
                board: emptyBoard,
                winner: null,
                gameStatus: GameStatus.InProgress,
                winningCells: [],
                lastCords: null,
            }
        ));
    }

    const handleResetAll = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setGameState({
            board: emptyBoard,
            gameHistory: [],
            gameId: 1,
            gameStatus: GameStatus.InProgress,
            lastCords: null,
            winner: null,
            winningCells: [],
            currentPlayer: 'player_1'
        })
    }

    return {
        gameState,
        handleColumnClick,
        handleEndGame,
        handleRestartGame,
        handleResetAll,
        highlightRestart
    };
}
