import React from "react";
import state from "../entities/GameState";
import ReactDOM from "react-dom";

const portal = document.getElementById("portal")

const GameState = props => {
    const {gameState} = props;

    return (
            <div className="state">
                {
                    gameState.state === state.won || gameState.state === state.lost
                        ? (
                            <>
                                {
                                    gameState.state === state.won
                                        ? <h1 className="winner">Winner, winner, chicken dinner!</h1>
                                        : gameState.state === state.lost
                                            ? <h1 className="loser">Game Over!</h1>
                                            : ''
                                }
                            </>
                        )
                        : ''
                }
            </div>
        )
}

export default GameState;