import type {CellStatus} from "../../types/game.ts";
import './board.css'

type BoardProps = {
    board: CellStatus[][];
    onColumnClick: (columnNumber: number) => void
}


function Board({board, onColumnClick}: BoardProps) {
    return (
        <>
            <div className='board'>

            </div>
        </>
    )
}

export default Board;
