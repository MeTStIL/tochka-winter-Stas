import {AppRoute} from "../../constants.ts";
import './welcome.css'
import TransitionButton from "../../components/transition-button/transition-button.tsx";


function Welcome() {
    return (
        <div className='welcome-screen'>
            <h1>Игра 4 в ряд</h1>
            <small>by Станислав Метляков</small>

            <TransitionButton to={AppRoute.Game} text={'Начать игру'}/>
        </div>
    );
}

export default Welcome;
