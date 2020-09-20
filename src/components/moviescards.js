import React from 'react';
import Cards from './cards';
function moviescards({ movieList, displayName, editMovie }) {
    return (
        <div style={{ display: 'flex', 'flexWrap': 'wrap' }}>
            {movieList.length > 0 ? movieList.map(({ id, detail }) => (
                <Cards key={id} id={id} detail={detail} adminName={displayName} editMovie={editMovie}></Cards>
            )) : <span>No movies found for this query</span>}{
            }
        </div>
    );
}
export default moviescards;
