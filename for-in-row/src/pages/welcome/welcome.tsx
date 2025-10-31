import {AppRoute, GameMode, LOCAL_STORAGE_KEY_GAME_MODE} from "../../constants.ts";
import './welcome.css'
import TransitionButton from "../../components/transition-button/transition-button.tsx";


function Welcome() {
    return (
        <div className='welcome-screen'>
            <h1>Игра 4 в ряд</h1>
            <small>by Станислав Метляков</small>

            <div className='start-game-btn'>
                <TransitionButton to={AppRoute.Game} text={'Игра с другом'} toSetItems={{gameMode: GameMode.HotChair}}
                                  storageKey={LOCAL_STORAGE_KEY_GAME_MODE}/>
                <TransitionButton to={AppRoute.Game} text={'Игра с ботом'} clearStorage
                                  toSetItems={{gameMode: GameMode.Bot}} storageKey={LOCAL_STORAGE_KEY_GAME_MODE}/>
            </div>

        </div>
    );
}

export default Welcome;
