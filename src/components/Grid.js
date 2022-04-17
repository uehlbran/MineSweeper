import React from "react";
import Cell from './Cell';

const Grid = props => {
    const grid = props.grid;

    const rows = React.useCallback(() => {
        const rows = Array(grid.rows).fill([]).map(arr => [...arr]);

        for (let i = 0; i < grid.rows * grid.rows; i += grid.rows) {
            rows.push(grid.cells.slice(i, grid.rows + i))
        }

        return rows
    }, [grid]);

    return (
        <div className='grid'>
            {
                rows().map((r, i) => {
                    return (
                        <div className='row' key={i}>
                            {
                                r.map(c => <Cell cell={c} key={c.id} onClick={e => props.cellOnClick(c.id, e)}/>)
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Grid;