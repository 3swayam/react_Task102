import React from 'react';
function filterbar({ genreList, updateGenreList }) {
    const updateList = (genreName) => {
        updateGenreList(genreName);
    }

    return (
        <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap' }}>
            {
                genreList.map((i) => (
                    <div style={{
                        border: '0.5px solid black',
                        borderRadius: '5px', padding: '4px', margin: '4px', backgroundColor: "#a5b2f1"
                    }} key={i} onClick={e => updateList(i)}>{i}</div>
                ))
            }
        </div>
    );
}
export default filterbar;
