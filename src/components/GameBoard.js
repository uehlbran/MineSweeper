import React, {useEffect, useState} from "react";
import Hud from "./Hud";
import Grid from "./Grid";
import GridBuilder from "../entities/Grid";
import GameState from "./GameState";
import state from "../entities/GameState";

const GameBoard = props => {
    const [grid, setGrid] = useState({});
    const [gameState, setGameState] = useState({state: state.playing})
    const [matrix, setMatrix] = useState([]);

    const initialize = React.useCallback(() => {
        const [grid, matrix] = (new GridBuilder(props.rowCount, props.bombChance).build());
        setGrid(grid);
        setMatrix(matrix);
        setGameState({state: state.playing});
    }, [props.rowCount, props.bombChance]);

    useEffect(() => {
        initialize();
    }, [initialize])

    const clickHandler = (id, e) => {
        e.preventDefault();
        switch (e.type) {
            case 'click':
                return reveal(id);
            case 'contextmenu':
                return toggleFlag(id);
            default:
                return;
        }
    }

    const hasWon = React.useCallback(() => {
        if (grid?.cells?.every(c => {
            if (c.hasBomb && c.isFlagged) return true;
            return !c.hasBomb && !c.isHidden;
        })) {
            setGameState({state: state.won});
        }
    }, [grid]);

    useEffect(() => {
        hasWon();
    }, [hasWon])

    const hasBomb = id => {
        if (grid.cells[id].hasBomb) {
            //reveal all bombs to the player
            grid.cells.forEach(c => c.hasBomb ? c.isHidden = false : null);
            //update state
            setGrid(prevState => ({...prevState, cells: grid.cells}));
            setGameState({state: state.lost});
            return true;
        }
        return false;
    }

    const reveal = id => {
        if (gameState.state !== state.playing) return;
        if (hasBomb(id)) return;

        const affectedCellIds = matrix[id];

        const predicate = c => (affectedCellIds.includes(c.id) || c.id === id) && !c.hasBomb && !c.isFlagged;

        const cells = grid.cells.map(c => predicate(c) ? {...c, isHidden: false} : c);

        setGrid(prevState => ({...prevState, cells: cells}));
    }

    const toggleFlag = id => {
        if (gameState.state !== state.playing) return;

        const cell = {...grid.cells[id]};
        if (!cell.isHidden) return;
        cell.isFlagged = !cell.isFlagged;

        setGrid(prevState => {
            prevState.cells[id] = cell;
            return {...prevState, flagCount: cell.isFlagged ? prevState.flagCount + 1 : prevState.flagCount - 1};
        })
    }

    return (
        <>
            <div>
                <GameState gameState={gameState} />
            </div>
            <div>
                <Hud bombCount={grid.bombCount} flagCount={grid.flagCount}/>
                <Grid grid={grid} cellOnClick={clickHandler}/>
                <button className="btn" onClick={() => initialize()}>Start Over</button>

            </div>
        </>
    )
}

export default GameBoard;