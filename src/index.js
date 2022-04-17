import React from 'react';
import ReactDOM from 'react-dom';
import "./main.css";
import GameBoard from './components/GameBoard'


ReactDOM.render(
    <React.StrictMode>
        <GameBoard rowCount={7} bombChance={0.35}/>
    </React.StrictMode>,
    document.getElementById('root')
);