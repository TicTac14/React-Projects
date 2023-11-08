import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Stats from './components/Stats';
import ResetButton from './components/ResetButton';

export default function App() {
  // useState Variables
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [gameWon, setGameWon] = useState(false);

  //check win functionality
  Array.prototype.getDuplicates = function () {
    var duplicates = {};
    for (var i = 0; i < this.length; i++) {
        if(duplicates.hasOwnProperty(this[i])) {
            duplicates[this[i]].push(i);
        } else if (this.lastIndexOf(this[i]) !== i) {
            duplicates[this[i]] = [i];
        }
    }

    return duplicates;
  };

  function checkWin(board) {
      // check rows
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];
    const indexes = board.getDuplicates();
    
    for (let i = 0; i < winningCombinations.length; i++){
      if (indexes["O"]){
        let Ocount = 0;
        for (let l = 0; l < 3; l++){
            if (indexes["O"].includes(winningCombinations[i][l])){
              Ocount ++;
            }
        }
        if (Ocount === 3){
          setGameWon(true);
          setPlayer("O");
        };
      }
      if (indexes["X"]){
        let Xcount = 0;
        for (let l = 0; l < 3; l++){
            if (indexes["X"].includes(winningCombinations[i][l])){
              Xcount ++;
            }
        }
        if (Xcount === 3){
          setGameWon(true);
          setPlayer("X")
        }
      }
    }
  }

  //check win after each change state of board
  useEffect(() => checkWin(board), board);

  //tile click handler
  function clickHandler(idx){
    if (!gameWon){
      let copy_board = board.slice();
      if (!copy_board[idx]){
          copy_board[idx] = player;
          setBoard(copy_board);
          if (!gameWon){
            setPlayer(player === "X" ? "O" : "X");
          }else {
            setPlayer(player);
          }
          
      }
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setGameWon(false);
    setPlayer("X");
  }

  return (
    <>
      <Header />
      <div className='content'>
        <div className='wrapper'>
            <Stats gameWon={gameWon} curPlayer={player}/>
            <Board board = {board} clickHandler={(idx) => clickHandler(idx)} gameWon={gameWon}/>
            <ResetButton handleReset={() => resetGame()} gameWon={gameWon}/>
        </div>
      </div>
    </>
  );
}

