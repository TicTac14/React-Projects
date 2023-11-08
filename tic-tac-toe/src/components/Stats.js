import React from "react";



export default function Stats({ gameWon, curPlayer }) {
    if (gameWon){
        return (
            <div className="stats">
                Player {curPlayer} won!
            </div>
        )
    }else {
        return (
            <div className="stats">
                Player {curPlayer}'s turn!
            </div>
        )
    }
    
}
