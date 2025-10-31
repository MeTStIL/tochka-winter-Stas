import {ALL_LOCAL_STORAGE_KEYS, type AppRoute} from "../../constants.ts";
import {Link} from "react-router-dom";
import './transition-button.css';


type TransitionButtonPops = {
    to: (typeof AppRoute)[keyof typeof AppRoute];
    text: string;
    className?: string;
    toSetItems?: {[key: string] : unknown};
    clearStorage?: boolean;
}

function TransitionButton({to, text, className = '', toSetItems, clearStorage = false}: TransitionButtonPops) {
    const handleClick = () => {
        if (clearStorage) {
            for (const key of ALL_LOCAL_STORAGE_KEYS) {
                localStorage.removeItem(key);
            }
        }
        if (toSetItems) {
            for (const [key, value] of Object.entries(toSetItems)) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        }
    }

    return (
        <Link to={to} className={`transition-btn ${className}`} onClick={handleClick}>
            {text}
        </Link>
    );
}

export default TransitionButton;

