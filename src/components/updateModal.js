import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
function UpdateModal({ displayUpdateModal, closeModal, updateMovie, genreList, updateMovieObj }) {

    const [movieId, setMovieId] = useState(null);
    const [listOfGenre, setListOfGenre] = useState([]);
    const [movieGenre, setMovieGenre] = useState([]);
    const [director, setDirector] = useState('');
    const [popularity, setPopularity] = useState('');
    const [imdb, setImdb] = useState('');
    const [newGenre, setNewGenre] = useState('');
    const [allMoviegenre, setAllMoviegenre] = useState([]);


    useEffect(() => {
        setMovieId(updateMovie.id ? updateMovie.id : null);
        setMovieGenre(updateMovie.detail.genre ? updateMovie.detail.genre : []);
        let allGenre = ([].concat(genreList));
        let usedGenre = Object.assign(updateMovie.detail.genre);
        usedGenre.forEach(element => {
            var index = allGenre.findIndex(x => x.trim() === element.trim());
            allGenre.splice(index, 1);
        });
        setListOfGenre([].concat(allGenre));
        setAllMoviegenre([].concat(genreList));
        setDirector(updateMovie.detail.director)
        setPopularity(updateMovie.detail['99popularity']);
        setImdb(updateMovie.detail.imdb_score)
    }, [updateMovie]);
    function addNewGenre(value) {
        let arr = Object.assign(movieGenre);
        if (value) {
            let availableGenre = Object.assign(listOfGenre);
            arr.push(value);
            var index = availableGenre.findIndex(x => x === value);
            availableGenre.splice(index, 1);
            setListOfGenre([].concat(availableGenre))
        }
        else {
            arr.push(newGenre);
            setNewGenre('');
        }
        setMovieGenre([].concat(arr));
    }

    function removeGenre(name) {
        let arr = Object.assign(movieGenre);
        var index = arr.findIndex(x => x.trim() === name.trim());
        arr.splice(index, 1);
        setMovieGenre([].concat(arr));

        var index2 = allMoviegenre.findIndex(x => x.trim() === name.trim());
        if (index2 !== -1) {
            let arr2 = Object.assign(listOfGenre);
            arr2.push(name);
            setListOfGenre([].concat(arr2));
        }
    }

    function updateNewMovie() {
        var obj = {
            id: movieId,
            director: director,
            genre: movieGenre,
            popularity: popularity,
            imdb: imdb
        }
        updateMovieObj(obj);
    }

    return (
        <div>
            <Modal show={displayUpdateModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Movie {(updateMovie?.detail?.name) ? updateMovie.detail.name : "no"}</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Director</Form.Label>
                        <Form.Control type="text" maxLength={30} placeholder="Enter name"
                            value={director}
                            onChange={e => setDirector(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>IMDB Rating</Form.Label>
                        <Form.Control type="number" min={0} max={10} placeholder="Enter number"
                            value={imdb}
                            onChange={e => setImdb(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>99popularity </Form.Label>
                        <Form.Control type="number" min={0} max={100} placeholder="Enter number"
                            value={popularity}
                            onChange={e => setPopularity(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Genre </Form.Label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            {
                                movieGenre.map((name) => (
                                    <div style={{
                                        border: '0.5px solid black',
                                        borderRadius: '5px', padding: '4px', margin: '4px', backgroundColor: "#a5b2f1"
                                    }} key={name} onClick={(e) => removeGenre(name)}>{name}</div>
                                ))
                            }
                        </div>
                        <Form.Label>All available Genre </Form.Label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            {
                                listOfGenre.map((name) => (
                                    <div style={{
                                        border: '0.5px solid black',
                                        borderRadius: '5px', padding: '4px', margin: '4px', backgroundColor: "#a5b2f1"
                                    }} key={name} onClick={(e) => addNewGenre(name)}>{name}</div>
                                ))
                            }
                        </div>
                        <Form.Text className="text-muted">
                        </Form.Text>

                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>New genre</Form.Label>
                        <Form.Control type="text" maxLength={15} placeholder="Enter name" style={{ width: '50%' }}
                            value={newGenre} onChange={e => setNewGenre(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                        <Button variant="secondary" onClick={(e) => addNewGenre()}>
                            Add
          </Button>
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
          </Button>
                    <Button variant="primary" onClick={(e) => updateNewMovie()}>
                        Update
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default UpdateModal;
