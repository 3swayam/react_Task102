import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAP7mKSFZ0WeuC7e9fMiuegj__bN5dN1tc",
    authDomain: "reactmovie102.firebaseapp.com",
    databaseURL: "https://reactmovie102.firebaseio.com",
    projectId: "reactmovie102",
    storageBucket: "reactmovie102.appspot.com",
    messagingSenderId: "503008017111",
    appId: "1:503008017111:web:8644dcf17f73e8945ece92",
    measurementId: "G-R71JNPNQ1J"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };