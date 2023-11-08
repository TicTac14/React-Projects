import React from "react";

export default function Tile ({ value, clicked }) {

    return (
        <div className="tile" onClick={(e) => clicked(e)}>
            {value}
        </div>
    )
}



