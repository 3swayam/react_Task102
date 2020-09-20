import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Searchbar from './components/searchbar';
import SortBar from './components/sortBar';
import Moviescards from './components/moviescards';
import LoginModal from './components/loginModal';
import UpdateLogin from './components/updateModal';
import Filterbar from './components/filterbar'
import { db, auth } from './firebase';
import list from './imdb.json';

function App() {

  const [searchText, setSearchText] = useState('');
  const [displayModal, setDisplayModal] = useState(false);
  const [email, setEmail] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [filterdMovieList, setFilterdMovieList] = useState([]);
  const [selectedGenreList, setSelectedGenreList] = useState([]);
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayUpdateModal, setDisplayUpdateModal] = useState(false);
  const [sortBy, setSortBy] = useState('99popularity');

  const [updateMovie, setUpdateMovie] = useState(null);


  const fire = true;

  useEffect(() => {
    getSortedMovies("99popularity");
  }, []);

  const getSortedMovies = (newValue) => {
    setSortBy(newValue);
    setLoading(true);
    if (fire) {
      if (newValue === "name") {
        db.collection('movies').orderBy('name', 'asc').onSnapshot(snap => {
          assignMovies(snap)
        });
      }
      else if (newValue === "director") {
        db.collection('movies').orderBy('director', 'asc').onSnapshot(snap => {
          assignMovies(snap)
        });
      }
      else if (newValue === "99popularity") {
        db.collection('movies').orderBy('99popularity', 'desc').onSnapshot(snap => {
          assignMovies(snap)
        });
      }
    } else {
      nofirbase();
    }
  }

  function assignMovies(snap) {
    let Aaar = [];
    snap.docs.forEach(doc => {
      let obj = {
        id: doc.id,
        detail: doc.data()
      }
      Aaar.push(obj);
    });
    setMovieList([].concat(Aaar))
  }

  function nofirbase() {
    let Aaar = [];
    list.forEach(doc => {
      let obj = {
        id: doc.name,
        detail: doc
      }
      Aaar.push(obj);
    });
    setMovieList([].concat(Aaar))
  }

  const filterMoviesByGenre = () => {
    let listOfAllMovies = Object.assign(movieList);
    selectedGenreList.forEach(genreName => {
      let arr = [];
      listOfAllMovies.forEach(movie => {
        movie.detail.genre.forEach(mGenre => {
          if (mGenre.trim() === genreName) {
            arr.push(movie);
          }
        });
      });
      listOfAllMovies = [].concat(arr);
    });
    setFilterdMovieList([].concat(listOfAllMovies));
  }

  useEffect(() => {
    filterMoviesByGenre();
  }, [genreList, selectedGenreList, movieList]);

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

  useEffect(() => {
    let array = [];
    movieList.forEach(element => {
      array = array.concat(element.detail.genre.toString().replace(/\s/g, '').split(','));
    });
    let uniqueGenreList = [...new Set(array)];
    setGenreList(uniqueGenreList);
    setSelectedGenreList([]);
    setLoading(false);
  }, [movieList]);

  useEffect(() => {
    auth.onAuthStateChanged(function (authUser) {
      authUser ? setAdmin(authUser) : setAdmin(null);
      if (admin) {
        var name = admin.email.split('@')[0];
        setDisplayName(name ? name : "");
      } else {
        setDisplayName("")
      }
    });
  }, [admin, displayName]);

  function handleEmailChange(newValue) {
    setEmail(newValue);
  }
  function handlePasswordChange(newValue) {
    setPassword(newValue);
  }

  function login() {
    auth.signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        alert(error.message);
      });
    setDisplayModal(false);
  }

  function signout() {
    auth.signOut();
    setAdmin(null);
  }

  const showLoginModal = (event) => {
    setEmail('');
    setPassword('');
    event.preventDefault();
    setDisplayModal(true);
  }
  const closeLoginModal = (event) => {
    setEmail('');
    setPassword('');
    setDisplayModal(false);
  }

  function editMovie(id, detail) {
    setUpdateMovie({
      id: id,
      detail: detail
    });
    setDisplayUpdateModal(true);
  }

  const closeEditMovieModal = (event) => {
    setDisplayUpdateModal(false);
    setUpdateMovie(null);

  }

  const addToFilterGenreList = (name) => {
    let gList = Object.assign(genreList);
    let selected = Object.assign(selectedGenreList);

    var index = gList.findIndex(x => x === name);
    if (index != -1) {
      gList.splice(index, 1);
      selected.push(name);
    }
    setSelectedGenreList([].concat(selected));
    setGenreList([].concat(gList));
  }
  const removeFromFilterGenreList = (name) => {
    let gList = Object.assign(genreList);
    let selected = Object.assign(selectedGenreList);
    var index = selected.findIndex(x => x === name);
    if (index != -1) {
      selected.splice(index, 1);
      gList.push(name);
    }
    setSelectedGenreList([].concat(selected));
    setGenreList([].concat(gList));
  }

  const updateMovieObj = (obj) => {
    db.collection("movies").doc(obj.id).update({
      "director": obj.director,
      "99popularity": obj.popularity,
      "genre": obj.genre,
      "imdb_score": obj.imdb,
      "updatedBy": displayName
    }).then(function () {
      let movies = Object.assign(movieList);
      movies.forEach(element => {
        if (element.id == obj.id) {
          element.detail["director"] = obj.director;
          element.detail["99popularity"] = obj.popularity;
          element.detail["genre"] = obj.genre;
          element.detail["imdb_score"] = obj.imdb;
          element.detail["updatedBy"] = displayName;
        }
      });
      setMovieList([].concat(movies));
      closeEditMovieModal();
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <React.Fragment>
      <Navbar showLoginModal={showLoginModal} admin={admin} signout={signout} displayName={displayName}></Navbar>
      {loading ? <p>Movies Are loading</p> : <div>
        <Searchbar sortBy={sortBy} retriveMovies={getSortedMovies}></Searchbar>

        {/* <div>
          <Row>
            <Col style={{ border: "1px solid lightgrey" }}>
              <span>Genres List </span>
              <Filterbar genreList={genreList} updateGenreList={addToFilterGenreList}></Filterbar></Col>
            <Col style={{ border: "1px solid lightgrey" }}><span>Filter Genres List</span><Filterbar genreList={selectedGenreList} updateGenreList={removeFromFilterGenreList}></Filterbar></Col>
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
        </div> */}
        <SortBar genreList={genreList} addToFilterGenreList={addToFilterGenreList}
          selectedGenreList={selectedGenreList} removeFromFilterGenreList={removeFromFilterGenreList}
          setSearchText={setSearchText} searchByName={searchByName}></SortBar>
        <Moviescards movieList={filterdMovieList} displayName={displayName} editMovie={editMovie}></Moviescards> </div>}

      <LoginModal displayModal={displayModal} closeLoginModal={closeLoginModal}
        email={email} handleEmailChange={handleEmailChange}
        password={password} handlePasswordChange={handlePasswordChange} login={login}></LoginModal>

      {displayUpdateModal ?
        <UpdateLogin displayUpdateModal={displayUpdateModal}
          closeModal={closeEditMovieModal} updateMovie={updateMovie}
          genreList={[].concat(genreList).concat(selectedGenreList)} updateMovieObj={updateMovieObj}
        ></UpdateLogin> : <span></span>}

    </React.Fragment>
  );
}

export default App;
