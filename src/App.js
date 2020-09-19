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
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(function (authUser) {
      authUser ? setAdmin(authUser) : setAdmin(null);
      if (admin) {
        var name = admin.email.split('@')[0];
        setDisplayName(name ? name : "");
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
    console.log(email, password);
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
    event.preventDefault();
    setDisplayModal(true);
  }
  const closeLoginModal = (event) => {
    setEmail('');
    setPassword('');
    setDisplayModal(false);
  }

  return (
    <div>
      <Navbar showLoginModal={showLoginModal} admin={admin} signout={signout} displayName={displayName}></Navbar>
      <Searchbar></Searchbar>
      <Moviescards></Moviescards>
      <LoginModal displayModal={displayModal} closeLoginModal={closeLoginModal}
        email={email} handleEmailChange={handleEmailChange}
        password={password} handlePasswordChange={handlePasswordChange} login={login}></LoginModal>
    </div>
  );
}

export default App;
