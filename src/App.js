import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Searchbar from './components/searchbar';
import Moviescards from './components/moviescards';
import LoginModal from './components/loginModal';

function App() {
  const [displayModal, setDisplayModal] = useState(false);

  const showLoginModal = (event) => {
    event.preventDefault();
    setDisplayModal(true);
  }
  const closeLoginModal = (event) => {
    setDisplayModal(false);
  }

  return (
    <div>
      <Navbar displayModal={displayModal} showLoginModal={showLoginModal}></Navbar>
      <Searchbar></Searchbar>
      <Moviescards></Moviescards>
      <LoginModal displayModal={displayModal} closeLoginModal={closeLoginModal}></LoginModal>
    </div>
  );
}

export default App;
