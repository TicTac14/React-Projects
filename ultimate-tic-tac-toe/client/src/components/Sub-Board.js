import React, {useState, useEffect} from 'react';
import Tile from './Tile';



export default function SubBoard({ styles, curPlayer, changePlayer, selectBoardToPlay, onGameWon, isSelectedBoard}) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [gameWon, setGameWon] = useState(false);
    const [playerWon, setPlayerWon] = useState(null);
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
            setPlayerWon("O");
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
            setGameWon(true);
            setPlayerWon("X");
            return "X";
          }
        }
      }
      return null;
    }
  
    //check win after each change state of board
    useEffect(() => {
      const won = checkWin(board);
      if (won){
        onGameWon(won);
      }
    }, board);
    

    function tileClicked(idx) {
        if (!gameWon && !board[idx] && isSelectedBoard){
            const copy_board = board.slice();
            copy_board[idx] = curPlayer;
            changePlayer(curPlayer === "X" ? "O" : "X");
            setBoard(copy_board);
            selectBoardToPlay(idx);
            
        }
    }


    if (!gameWon){
      return(
        <div className='subBoard' style={styles}>
            <Tile value={board[0]} tileClicked={() => tileClicked(0)} styles={{borderRight: "1px black solid", borderBottom: "1px black solid"}}/>
            <Tile value={board[1]} tileClicked={() => tileClicked(1)} styles={{borderRight: "1px black solid", borderBottom: "1px black solid"}}/>
            <Tile value={board[2]} tileClicked={() => tileClicked(2)} styles={{borderBottom: "1px black solid"}}/>
            <Tile value={board[3]} tileClicked={() => tileClicked(3)} styles={{borderRight: "1px black solid", borderBottom: "1px black solid"}}/>
            <Tile value={board[4]} tileClicked={() => tileClicked(4)} styles={{borderRight: "1px black solid", borderBottom: "1px black solid"}}/>
            <Tile value={board[5]} tileClicked={() => tileClicked(5)} styles={{borderBottom: "1px black solid"}}/>
            <Tile value={board[6]} tileClicked={() => tileClicked(6)} styles={{borderRight: "1px black solid"}}/>
            <Tile value={board[7]} tileClicked={() => tileClicked(7)} styles={{borderRight: "1px black solid"}}/>
            <Tile value={board[8]} tileClicked={() => tileClicked(8)}/>
        </div>
      )
    }else if (gameWon){
      return (
        <div className='subBoard-won' style={styles}>
            {playerWon}
        </div>
      )
    }
    
}