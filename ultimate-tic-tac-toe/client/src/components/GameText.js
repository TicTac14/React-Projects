import React from "react";


export default function GameText({curPlayer}) {
    return (
        <div className="text">
            Player {curPlayer}'s turn
        </div>
    )
}