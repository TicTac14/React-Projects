import React from 'react';

export default function Tile({ value, tileClicked, styles}) {
    return (
        <div className='tile' onClick={tileClicked} style={styles}>
            {value}
        </div>
    )
}