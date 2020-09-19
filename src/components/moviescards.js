import React from 'react';
import Cards from './cards';
function moviescards({ movieList, displayName }) {
    return (
        <div style={{ display: 'flex', 'flexWrap': 'wrap' }}>
            {
                movieList.map(({ id, detail }) => (
                    <Cards key={id} id={id} detail={detail} adminName={displayName}></Cards>
                ))
            }

        </div>
    );
}
export default moviescards = React.memo(moviescards);
