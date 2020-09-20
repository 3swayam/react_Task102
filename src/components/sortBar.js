import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Filterbar from './filterbar';
function Sortbar({ genreList, selectedGenreList, updateListOfGenres,
    filterMoviesByGenre, setFilterdMovieList, filterdMovieList }) {
    const [searchText, setSearchText] = useState('');
    const addToFilterGenreList = (name) => {
        let gList = Object.assign(genreList);
        let selected = Object.assign(selectedGenreList);
        var index = gList.findIndex(x => x === name);
        if (index != -1) {
            gList.splice(index, 1);
            selected.push(name);
        }
        updateListOfGenres([].concat(selected), [].concat(gList))

    }
    const removeFromFilterGenreList = (name) => {
        let gList = Object.assign(genreList);
        let selected = Object.assign(selectedGenreList);
        var index = selected.findIndex(x => x === name);
        if (index != -1) {
            selected.splice(index, 1);
            gList.push(name);
        }
        updateListOfGenres([].concat(selected), [].concat(gList))
    }
    const searchByName = (event) => {
        event.preventDefault();
        let arr = [];
        if (searchText) {
            filterdMovieList.forEach(movie => {
                if (movie.detail.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    movie.detail.director.toLowerCase().includes(searchText.toLowerCase())) {
                    arr.push(movie);
                }
            });
            setFilterdMovieList([].concat(arr));
        }
        else {
            filterMoviesByGenre();
        }
    }
    return (
        <div>
            <Row>
                <Col style={{ border: "1px solid lightgrey" }}>
                    <span>Genres List </span>
                    <Filterbar genreList={genreList} updateGenreList={addToFilterGenreList}></Filterbar></Col>
                <Col style={{ border: "1px solid lightgrey" }}><span>
                    Filter Genres List</span><Filterbar genreList={selectedGenreList}
                        updateGenreList={removeFromFilterGenreList}></Filterbar></Col>
                <Col>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Search By name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Text" onChange={(e) => setSearchText(e.target.value)} />

                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(e) => { searchByName(e) }}>
                            Search
</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
export default Sortbar;
