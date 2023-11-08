import React from "react";
import Tile from "./Tile";

export default function Board({ board, clickHandler, gameWon}) {

    const blurStyle = gameWon == true ? 'blur(10px)' : "blur(0px)"
    return (
        <div className="board" style={{filter: blurStyle}}>
            <Tile value={board[0]} clicked = {() => clickHandler(0)}/>
            <Tile value={board[1]} clicked = {() => clickHandler(1)}/>
            <Tile value={board[2]} clicked = {() => clickHandler(2)}/>
            <Tile value={board[3]} clicked = {() => clickHandler(3)}/>
            <Tile value={board[4]} clicked = {() => clickHandler(4)}/>
            <Tile value={board[5]} clicked = {() => clickHandler(5)}/>
            <Tile value={board[6]} clicked = {() => clickHandler(6)}/>
            <Tile value={board[7]} clicked = {() => clickHandler(7)}/>
            <Tile value={board[8]} clicked = {() => clickHandler(8)}/>
        </div>
    )
}