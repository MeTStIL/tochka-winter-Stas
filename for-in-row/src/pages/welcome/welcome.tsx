import {ALL_LOCAL_STORAGE_KEYS, AppRoute, GameMode, LOCAL_STORAGE_KEY_GAME_MODE} from "../../constants.ts";
import './welcome.css'
import TransitionButton from "../../components/transition-button/transition-button.tsx";


function Welcome() {
    for (const key of ALL_LOCAL_STORAGE_KEYS) {
        localStorage.removeItem(key);
    }

    return (
        <div className='welcome-screen'>
            <h1>Игра 4 в ряд</h1>
            <small>by Станислав Метляков</small>

            <div className='start-game-btn'>
                <TransitionButton to={AppRoute.Game}
                                  text={'С другом'}
                                  toSetItems={{[LOCAL_STORAGE_KEY_GAME_MODE]: GameMode.HotChair}}
                />
                <TransitionButton to={AppRoute.Game}
                                  text={'С ботом'}
                                  toSetItems={{[LOCAL_STORAGE_KEY_GAME_MODE]: GameMode.Bot }}/>
            </div>

        </div>
    );
}

export default Welcome;
