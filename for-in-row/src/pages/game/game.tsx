import type {GameModeType} from '../../types/game.ts';
import {
    AppRoute, GameMode, GameStatus, LOCAL_STORAGE_KEY_GAME_MODE
} from '../../constants.ts';
import Board from '../../components/board/board.tsx';
import {getGameHeader} from '../../utils/ui/get-game-header.tsx';
import './game.css'
import GameHistory from '../../components/game-history/game-history.tsx';
import TransitionButton from '../../components/transition-button/transition-button.tsx';
import playerCanMakeMove from "../../utils/game/player-can-make-move.ts";
import {useLocalStorage} from "../../hooks/use-local-storage.ts";
import {useGameLogic} from "../../hooks/use-game-logic.ts";


function Game() {


    const [gameMode,] = useLocalStorage<GameModeType>(LOCAL_STORAGE_KEY_GAME_MODE, GameMode.HotChair);

    const {
        gameState,
        handleResetAll,
        handleRestartGame,
        handleEndGame,
        handleColumnClick,
        highlightRestart
    } = useGameLogic(gameMode);


    return (
        <div className='game-layout'>
            <TransitionButton to={AppRoute.Main} text={'Вернуться на главную'} className={'back-to-main'} clearStorage/>
            <div className='game-content'>
                <h1>{getGameHeader(gameState.gameStatus, gameState.currentPlayer, gameMode)}</h1>
                <Board board={gameState.board}
                       onColumnClick={playerCanMakeMove(gameMode, gameState.currentPlayer, gameState.gameStatus)
                           ? handleColumnClick
                           : gameState.gameStatus === GameStatus.InProgress
                               ? () => {}
                               : handleEndGame}
                       currentPlayer={gameState.currentPlayer}
                       gameMode={gameMode}
                       gameStatus={gameState.gameStatus}
                       winningCells={gameState.winningCells}
                       lastCords={gameState.lastCords}
                />

                <div className='btn-container'>
                    <button className={`restart-btn ${highlightRestart ? 'highlight' : ''}`}
                            onClick={handleRestartGame}>
                        Очистить доску
                    </button>

                    <button className='reset-btn' onClick={handleResetAll}>
                        Очистить историю
                    </button>
                </div>
            </div>
            <GameHistory history={gameState.gameHistory} gameMode={gameMode}/>
        </div>
    );
}

export default Game;



