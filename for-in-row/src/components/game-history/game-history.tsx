import type {GameResult} from "../../types/game.ts";
import './game-history.css'

type GameHistoryProps = {
    history: GameResult[];
}

function GameHistory({history}: GameHistoryProps) {
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
                                    : game.winner === 'player_1'
                                        ? 'Игрок 1 🔴'
                                        : 'Игрок 2🟡'

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
