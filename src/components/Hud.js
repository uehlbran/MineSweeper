import React from "react";

const Hud = props => {
    const {bombCount, flagCount} = props;

    return (
        <div className="hud">
            <p>Bomb Count: {bombCount}</p>
            <p className={`${flagCount > bombCount ? 'danger' : ''}`}>Flags Placed: {flagCount}</p>
        </div>
    )
}

export default Hud;