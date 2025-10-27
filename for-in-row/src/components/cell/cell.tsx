import type {CellStatus, Player} from "../../types/game.ts";
import './cell.css';
import {CellPreviewColor, PlayersColor} from "../../constants.ts";


type CellProps = {
    value: CellStatus;
    showPreview?: boolean;
    previewPlayer?: Player;
    onClick: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isWinningCell?: boolean;
};


function Cell({value, showPreview = false, previewPlayer, onClick, onMouseEnter, onMouseLeave, isWinningCell}: CellProps) {
    const getColor = () => {
        switch (value) {
            case 'player_1':
                return PlayersColor.Player1;
            case 'player_2':
                return PlayersColor.Player2;
            default:
                return PlayersColor.NoPlayer;
        }
    };

    const getPreviewColor = (): string => {
        switch (previewPlayer) {
            case 'player_1':
                return CellPreviewColor.Player1;
            case 'player_2':
                return CellPreviewColor.Player2;
            default:
                return CellPreviewColor.NoPlayer;
        }
    };

    const style = {
        backgroundColor: value === null && showPreview && previewPlayer
            ? getPreviewColor()
            : getColor(),
        boxShadow: isWinningCell ? '0 0 15px 5px orange' : 'none',
    };

    return (
        <div
            className='cell'
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={style}
        />
    )

}

export default Cell;
