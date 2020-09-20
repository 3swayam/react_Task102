import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Filterbar from './filterbar';
function Sortbar({ genreList, addToFilterGenreList, selectedGenreList, removeFromFilterGenreList, setSearchText, searchByName }) {
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
