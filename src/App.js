import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Searchbar from './components/searchbar';
import SortBar from './components/sortBar';
import Moviescards from './components/moviescards';
import LoginModal from './components/loginModal';
import UpdateLogin from './components/updateModal';
import { db, auth } from './firebase';

function App() {

  const [sortBy, setSortBy] = useState('99popularity');
  const [displayModal, setDisplayModal] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [filterdMovieList, setFilterdMovieList] = useState([]);
  const [selectedGenreList, setSelectedGenreList] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayUpdateModal, setDisplayUpdateModal] = useState(false);


  const [updateMovie, setUpdateMovie] = useState(null);


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
  }, [genreList, selectedGenreList]);

  useEffect(() => {
    let array = [];
    movieList.forEach(element => {
      array = array.concat(element.detail.genre.toString().replace(/\s/g, '').split(','));
    });
    let uniqueGenreList = [...new Set(array)];
    setGenreList(uniqueGenreList);
    setSelectedGenreList([]);
    setLoading(false);
    //filterMoviesByGenre();
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

  function signout() {
    auth.signOut();
    setAdmin(null);
  }

  const showLoginModal = (event) => {
    event.preventDefault();
    setDisplayModal(true);
  }
  const closeLoginModal = (event) => {
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

  function updateListOfGenres(list1, list2) {
    setSelectedGenreList(list1);
    setGenreList(list2);
  }
  useEffect(() => {
    getSortedMovies(sortBy);
  }, []);

  const getSortedMovies = (newValue) => {
    setSortBy(newValue);
    setLoading(true);
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


  return (
    <React.Fragment>
      <Navbar showLoginModal={showLoginModal} admin={admin} signout={signout} displayName={displayName}></Navbar>
      {loading ? <p>Movies Are loading</p> : <div>
        <Searchbar sortBy={sortBy} getSortedMovies={getSortedMovies}></Searchbar>
        <SortBar genreList={genreList}
          selectedGenreList={selectedGenreList} updateListOfGenres={updateListOfGenres}
          filterMoviesByGenre={filterMoviesByGenre} setFilterdMovieList={setFilterdMovieList}
          filterdMovieList={filterdMovieList}
        ></SortBar>
        <Moviescards movieList={filterdMovieList} displayName={displayName} editMovie={editMovie}></Moviescards> </div>}

      <LoginModal displayModal={displayModal} closeLoginModal={closeLoginModal}
      ></LoginModal>

      {displayUpdateModal ?
        <UpdateLogin displayUpdateModal={displayUpdateModal}
          closeModal={closeEditMovieModal} updateMovie={updateMovie}
          genreList={[].concat(genreList).concat(selectedGenreList)} updateMovieObj={updateMovieObj}
        ></UpdateLogin> : <span></span>}

    </React.Fragment>
  );
}

export default App;
