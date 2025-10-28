import TransitionButton from "../../components/transition-button/transition-button.tsx";
import {AppRoute} from "../../constants.ts";
import './not-found.css';

function NotFound() {
    return (
        <div className='not-found'>
            <h1>404</h1>
            <h1>Такой страницы нет</h1>
            <TransitionButton to={AppRoute.Main} text={'Вернуться на главную'} />
        </div>
    );
}

export default NotFound;
