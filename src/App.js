import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Searchbar from './components/searchbar';
import Moviescards from './components/moviescards';
import LoginModal from './components/loginModal';
import { db, auth } from './firebase';

function App() {
  const [displayModal, setDisplayModal] = useState(false);
  const [email, setEmail] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('99popularity');

  useEffect(() => {
    setLoading(true);
    getSortedMovies("99popularity");
  }, []);

  useEffect(() => {
    let array = [];
    movieList.forEach(element => {
      array = array.concat(element.detail.genre);
    });
    let uniqueGenreList = [...new Set(array)];
    setGenreList(uniqueGenreList);
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

  const getSortedMovies = (newValue) => {
    setSortBy(newValue);
    setLoading(true);
    setMovieList([]);

    if (newValue === "name") {
      db.collection('movies').orderBy('name', 'asc').onSnapshot(snap => {
        assignMovies(snap)
      });
    }
    else if (newValue === "director") {
      console.log("director move")
      db.collection('movies').orderBy('director', 'asc').onSnapshot(snap => {
        assignMovies(snap)
      });
    }
    else if (newValue === "99popularity") {
      console.log("99popularity move")
      db.collection('movies').orderBy('99popularity', 'desc').onSnapshot(snap => {
        assignMovies(snap)
      });
    }
  }

  function assignMovies(snap) {
    setMovieList(snap.docs.map(doc => (
      {
        id: doc.id,
        detail: doc.data()
      })
    ))
  }

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

  return (
    <React.Fragment>
      <Navbar showLoginModal={showLoginModal} admin={admin} signout={signout} displayName={displayName}></Navbar>
      {loading ? <p>loadingggggg</p> : <div>
        <Searchbar sortBy={sortBy} retriveMovies={getSortedMovies}></Searchbar>
        <Moviescards movieList={movieList} displayName={displayName}></Moviescards> </div>}

      <LoginModal displayModal={displayModal} closeLoginModal={closeLoginModal}
        email={email} handleEmailChange={handleEmailChange}
        password={password} handlePasswordChange={handlePasswordChange} login={login}></LoginModal>
    </React.Fragment>
  );
}

export default App;
