import type {BoardType, GameResult, Player} from '../../types/game.ts';
import {
    AppRoute,
    BoardSize, GameMode,
    type GameModeType,
    GameStatus,
    type GameStatusType,
    LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_GAME_MODE
} from '../../constants.ts';
import {useEffect, useState} from 'react';
import Board from '../../components/board/board.tsx';
import {checkWin} from '../../utils/check-win.ts';
import {getGameHeader} from '../../utils/get-game-header.tsx';
import './game.css'
import GameHistory from '../../components/game-history/game-history.tsx';
import TransitionButton from '../../components/transition-button/transition-button.tsx';
import makeBotMove from "../../utils/make-bot-move.ts";
import playerCanMakeMove from "../../utils/player-can-make-move.ts";


function Game() {
    const emptyBoard: BoardType = Array.from({length: BoardSize.Rows}, () => Array(BoardSize.Columns).fill(null));

    const stateGameMode = localStorage.getItem(LOCAL_STORAGE_KEY_GAME_MODE);
    const [gameMode, setGameMode] = useState<GameModeType>(
        () => stateGameMode ? JSON.parse(stateGameMode).gameMode : GameMode.HotChair
    );

    const state = localStorage.getItem(LOCAL_STORAGE_KEY);

    const [currentPlayer, setCurrentPlayer] = useState<Player>(() => {
        return state ? JSON.parse(state).currentPlayer : 'player_1';
    });
    const [board, setBoard] = useState<BoardType>(() => {
        return state ? JSON.parse(state).board : emptyBoard;
    });
    const [winner, setWinner] = useState<null | Player>(() => {
        return state ? JSON.parse(state).winner : null;
    });
    const [gameStatus, setGameStatus] = useState<GameStatusType>(() => {
        return state ? JSON.parse(state).gameStatus : GameStatus.InProgress;
    });
    const [winningCells, setWinningCells] = useState<[number, number][]>(() => {
        return state ? JSON.parse(state).winningCells : [];
    });
    const [gameHistory, setGameHistory] = useState<GameResult[]>(() => {
        return state ? JSON.parse(state).gameHistory : [];
    })
    const [gameId, setGameId] = useState(() => {
        return state ? JSON.parse(state).gameId : 1;
    });
    const [lastCords, setLastCords] = useState<[number, number] | null>(() => {
        return state ? JSON.parse(state).lastCords : null;
    })
    const [highlightRestart, setHighlightRestart] = useState(false);

    useEffect(() => {
        const state = {
            currentPlayer,
            board,
            winner,
            gameStatus,
            winningCells,
            gameHistory,
            gameId,
            lastCords,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
        localStorage.setItem(LOCAL_STORAGE_KEY_GAME_MODE, JSON.stringify(({gameMode})));
    }, [gameMode, currentPlayer, board, winner, gameStatus, winningCells, gameHistory, gameId, lastCords]);

    useEffect(() => {
        if (gameStatus !== GameStatus.InProgress) {
            handleEndGame();
        }
    }, [gameStatus]);

    useEffect(() => {
        if (gameMode !== GameMode.Bot || currentPlayer !== 'player_2') {
            return;
        }

        if (gameStatus !== GameStatus.InProgress || winner) {
            return;
        }

        const botChoose = makeBotMove(board);
        if (botChoose === undefined) {
            return;
        }

        const timer = setTimeout(() => {
            handleColumnClick(botChoose);
        }, 800);

        return () => clearTimeout(timer);
    }, [currentPlayer, gameStatus]);


    const handleColumnClick = (column: number) => {
        if (winner) {
            return;
        }

        const newBoard = board.map((row) => [...row]);
        let placedRow = -1;
        for (let row = BoardSize.Rows - 1; row >= 0; row--) {
            if (newBoard[row][column] === null) {
                newBoard[row][column] = currentPlayer;
                placedRow = row;
                break;
            }
        }

        if (placedRow === -1) {
            return;
        }

        setLastCords([placedRow, column])

        const winnerInfo = checkWin(newBoard, currentPlayer);


        if (!winnerInfo) {
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'player_1' ? 'player_2' : 'player_1');
            return;
        }

        const gameResult: GameResult = {
            id: gameId,
            winner: winnerInfo.player === GameStatus.Draw ? GameStatus.Draw : currentPlayer
        }

        setGameHistory([...gameHistory, gameResult]);
        setGameId(gameId + 1);

        if (winnerInfo.player === GameStatus.Draw) {
            setGameStatus(GameStatus.Draw);
            setBoard(newBoard);
            return;
        } else if (winnerInfo.player === GameStatus.SomebodyWins) {
            setWinner(currentPlayer);
            setWinningCells(winnerInfo.winPositions);
            setBoard(newBoard);
            setGameStatus(GameStatus.SomebodyWins);
            return;
        }
    }

    const handleEndGame = () => {
        setHighlightRestart(true);
        setTimeout(() => setHighlightRestart(false), 800);
    }

    const handleRestartGame = () => {
        setCurrentPlayer(gameId % 2 === 0 ? 'player_2' : 'player_1');
        setBoard(emptyBoard);
        setWinner(null);
        setGameStatus(GameStatus.InProgress);
        setWinningCells([]);
        setLastCords(null);
        setGameMode(gameMode);
    }

    const handleResetAll = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setCurrentPlayer('player_1');
        setBoard(emptyBoard);
        setWinner(null);
        setGameStatus(GameStatus.InProgress);
        setGameHistory([]);
        setWinningCells([]);
        setGameId(1);
        setLastCords(null);
    }


    return (
        <div className='game-layout'>
            <TransitionButton to={AppRoute.Main} text={'Вернуться на главную'} className={'back-to-main'} clearStorage/>
            <div className='game-content'>
                <h1>{getGameHeader(gameStatus, currentPlayer, gameMode)}</h1>
                <Board board={board}
                       onColumnClick={playerCanMakeMove(gameMode, currentPlayer, gameStatus) ? handleColumnClick : handleEndGame}
                       currentPlayer={currentPlayer}
                       gameMode={gameMode}
                       gameStatus={gameStatus}
                       winningCells={winningCells}
                       lastCords={lastCords}
                />

                <div className='btn-container'>
                    <button className={`restart-btn ${highlightRestart ? 'highlight' : ''}`} onClick={handleRestartGame}>
                        Сбросить поле
                    </button>

                    <button className='reset-btn' onClick={handleResetAll}>
                        Начать играть сначала
                    </button>
                </div>
            </div>
            <GameHistory history={gameHistory}/>
        </div>
    );
}

export default Game;



