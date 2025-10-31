import type {GameModeType, GameResult} from "../../types/game.ts";
import './game-history.css'
import getPlayerName from "../../utils/ui/get-player-name.ts";

type GameHistoryProps = {
    history: GameResult[];
    gameMode: GameModeType;
}

function GameHistory({history, gameMode}: GameHistoryProps) {
    return (
        <div className='game-history-container'>
            <h3>История партий</h3>
            <table className='game-history-table'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Результат</th>
                </tr>
                </thead>

                <tbody>
                {history.map((game, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            {
                                game.winner === 'draw'
                                    ? 'Ничья'
                                    : getPlayerName(game.winner, gameMode)

                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default GameHistory;
