import type {AppRoute} from "../../constants.ts";
import {Link} from "react-router-dom";
import './transition-button.css';


type TransitionButtonPops = {
    to: (typeof AppRoute)[keyof typeof AppRoute];
    text: string;
    className?: string;
}

function TransitionButton({to, text, className = ''}: TransitionButtonPops) {
    return (
        <Link to={to} className={`transition-btn ${className}`}>
            {text}
        </Link>
    );
}

export default TransitionButton;

