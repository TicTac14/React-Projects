import './App.css';
import React, { useState, useEffect} from 'react';
import Header from './components/Header';
import { deepEqual } from 'mathjs';
import SubBoard from './components/Sub-Board';
import GameText from './components/GameText';

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

export default function App() {
  const [curPlayer, setCurPlayer] = useState('X');
  const [outerBoard, setOuterBoard] = useState(Array(9).fill(null));
  const [boardToPlay, setBoardToPlay] = useState(Array(9).fill(true));
  const [outerGameWon, setOuterGameWon] = useState(false);
  const [fullGamePlayerWinner, setFullGameWinner] = useState(null);
  function changePlayer(player) {
    setCurPlayer(player);
  }

  function switchSubBoards(idx){
    if (outerBoard[idx]!== null){
      const copyOfBoard = boardToPlay.slice();
      let possible_indexes = [];
      for (let i = 0; i < boardToPlay.length; i++){
        const item = outerBoard[i];
        item===null?possible_indexes.push(i):console.log('a');;
      }
      
      let randIndex = Math.floor(Math.random()*possible_indexes.length);
      console.log(possible_indexes, randIndex);
      for (let i = 0; i < copyOfBoard.length; i++){
          if (copyOfBoard[i] !== null){
            if (i === randIndex){
              copyOfBoard[i] = true; 
            }else {
              copyOfBoard[i] = false;
            }
          }
      }
      setBoardToPlay(copyOfBoard);
    }else {
      const copyOfBoard = boardToPlay.slice();
      for (let i = 0; i < copyOfBoard.length; i++){
        if (i !== idx){
          copyOfBoard[i] = false; 
        }else {
          copyOfBoard[i] = true;
        }
      }
      setBoardToPlay(copyOfBoard);
    }
    
  }

  function subBoardWon(idx, player){
    const copy_board = outerBoard.slice();
    copy_board[idx] = player;
    setOuterBoard(copy_board);
    let copy_board_2 = boardToPlay.slice();
    copy_board_2[idx] = null;
    setBoardToPlay(copy_board_2);
    
  }

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
          setOuterGameWon(true);
          setFullGameWinner("O");
          return "O";
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
          setOuterGameWon(true);
          setFullGameWinner("X");
          return "X";
        }
      }
    }
    return null;
  }

  useEffect(() => {
    if (!(deepEqual(boardToPlay,Array(9).fill(true))) && outerBoard[boardToPlay.indexOf(true)] !== null){
      const copyOfBoard = boardToPlay.slice();
      let possible_indexes = [];
      for (let i = 0; i < boardToPlay.length; i++){
        const item = outerBoard[i];
        item===null?possible_indexes.push(i):console.log('a');;
      }
      
      let randIndex = Math.floor(Math.random()*possible_indexes.length);
      console.log(possible_indexes, randIndex);
      for (let i = 0; i < copyOfBoard.length; i++){
          if (copyOfBoard[i] !== null){
            if (i === randIndex){
              copyOfBoard[i] = true; 
            }else {
              copyOfBoard[i] = false;
            }
          }
      }
      setBoardToPlay(copyOfBoard);
    }
    
  }, outerBoard);
  
  useEffect(() => {
    const fullGameWinner = checkWin(outerBoard);

    if (fullGameWinner){
      setFullGameWinner(fullGameWinner);
      setOuterGameWon(true);
    }
  }, outerBoard);

  return (
    <>
      <Header />
      <div className='content'>
        <GameText curPlayer={curPlayer} />
        <div className='wrapper' style={{filter: outerGameWon?"blur(5px)":"none"}}>
            <SubBoard styles={{borderRight:"2px black solid",borderBottom:"2px black solid",background:boardToPlay[0]===true?"white":"rgba(172, 172, 172, 0.518)"}} 
                      curPlayer={curPlayer} 
                      changePlayer={(e)=>changePlayer(e)}
                      selectBoardToPlay={(idx)=> switchSubBoards(idx)} 
                      onGameWon={(p)=>subBoardWon(0, p)}
                      isSelectedBoard={deepEqual(boardToPlay,Array(9).fill(true))? true:boardToPlay.indexOf(true) === 0}/>

            <SubBoard styles={{borderRight: "2px black solid", borderBottom: "2px black solid",background:boardToPlay[1]===true?"white":"rgba(172, 172, 172, 0.518)"}} 
                      curPlayer={curPlayer} 
                      changePlayer={(e)=>changePlayer(e)}
                      selectBoardToPlay={(idx) => switchSubBoards(idx)} 
                      onGameWon={(p)=>subBoardWon(1, p)}
                      isSelectedBoard={deepEqual(boardToPlay,Array(9).fill(true))? true:boardToPlay.indexOf(true) === 1}/>

            <SubBoard styles={{borderBottom: "2px black solid",background:boardToPlay[2]===true?"white":"rgba(172, 172, 172, 0.518)"}}
                      curPlayer={curPlayer} 
                      changePlayer={(e)=>changePlayer(e)}
                      selectBoardToPlay={(idx) => switchSubBoards(idx)} 
                      onGameWon={(p)=>subBoardWon(2, p)}
                      isSelectedBoard={deepEqual(boardToPlay,Array(9).fill(true))? true:boardToPlay.indexOf(true) === 2}/>

            <SubBoard styles={{borderRight: "2px black solid", borderBottom: "2px black solid",background:boardToPlay[3]===true?"white":"rgba(172, 172, 172, 0.518)"}}
                      curPlayer={curPlayer} 
                      changePlayer={(e)=>changePlayer(e)}
                      selectBoardToPlay={(idx) => switchSubBoards(idx)} 
                      onGameWon={(p)=>subBoardWon(3, p)}
                      isSelectedBoard={deepEqual(boardToPlay,Array(9).fill(true))? true:boardToPlay.indexOf(true) === 3}/>

            <SubBoard styles={{borderRight: "2px black solid", borderBottom: "2px black solid",background:boardToPlay[4]===true?"white":"rgba(172, 172, 172, 0.518)"}}
                      curPlayer={curPlayer} 
                      changePlayer={(e)=>changePlayer(e)}
                      selectBoardToPlay={(idx)=>switchSubBoards(idx)} 
                      onGameWon={(p)=>subBoardWon(4, p)}
                      isSelectedBoard={deepEqual(boardToPlay,Array(9).fill(true))? true:boardToPlay.indexOf(true) === 4}/>

            <SubBoard styles={{borderBottom: "2px black solid",background:boardToPlay[5]===true?"white":"rgba(172, 172, 172, 0.518)"}}
                      curPlayer={curPlayer} 
                      changePlayer={(e) => changePlayer(e)} 
                      selectBoardToPlay={(idx) => switchSubBoards(idx)} 
                      onGameWon={(p)=>subBoardWon(4, p)}
                      isSelectedBoard={deepEqual(boardToPlay,Array(9).fill(true))? true:boardToPlay.indexOf(true) === 5}/>

            <SubBoard styles={{borderRight: "2px black solid",background:boardToPlay[6]===true?"white":"rgba(172, 172, 172, 0.518)"}} 
                      curPlayer={curPlayer} 
                      changePlayer={(e) => changePlayer(e)} 
                      selectBoardToPlay={(idx) => switchSubBoards(idx)} 
                      onGameWon={(p)=>subBoardWon(6, p)}
                      isSelectedBoard={deepEqual(boardToPlay,Array(9).fill(true))? true:boardToPlay.indexOf(true) === 6}/>

            <SubBoard styles={{borderRight: "2px black solid",background:boardToPlay[7]===true?"white":"rgba(172, 172, 172, 0.518)"}} 
                      curPlayer={curPlayer}
                      changePlayer={(e) => changePlayer(e)}
                      selectBoardToPlay={(idx) => switchSubBoards(idx)} 
                      onGameWon={(p)=>subBoardWon(7, p)}
                      isSelectedBoard={deepEqual(boardToPlay,Array(9).fill(true))? true:boardToPlay.indexOf(true) === 7}/>

            <SubBoard styles={{background:boardToPlay[8]===true?"white":"rgba(172, 172, 172, 0.518)"}} 
                      curPlayer={curPlayer}
                      changePlayer={(e) => changePlayer(e)}
                      selectBoardToPlay={(idx) => switchSubBoards(idx)} 
                      onGameWon={(p)=>subBoardWon(8, p)}
                      isSelectedBoard={deepEqual(boardToPlay,Array(9).fill(true))? true:boardToPlay.indexOf(true)===8}/>
        </div>
      </div>
    </>
  );
}


