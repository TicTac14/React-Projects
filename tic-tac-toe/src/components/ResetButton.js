import React from "react";


export default function ResetButton({ handleReset, gameWon}) {
    if (gameWon){
        return (
            <div className="btn-container">
                <button className="resetButton" onClick={handleReset}>
                    Reset
                </button>
            </div>
        ) 
    }
    
}
