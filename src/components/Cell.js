import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBomb, faRadiation} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Cell = props => {
    const {cell, onClick} = props;

    return (
        <div
            className={`cell ${cell.isFlagged ? 'flagged' : ''} ${cell.isHidden ? 'hidden' : ''} ${cell.hasBomb && !cell.isHidden ? 'bomb' : ''}`}
            onClick={onClick}
            onContextMenu={onClick}
        >
            <span>{
                cell.isHidden
                    ? cell.isFlagged
                        ? <FontAwesomeIcon icon={faRadiation}/>
                        : ''
                    : cell.hasBomb
                        ? <FontAwesomeIcon icon={faBomb}/>
                        : cell.adjacentBombs > 0
                            ? cell.adjacentBombs
                            : ''
            }</span>
        </div>
    )
}

export default Cell;