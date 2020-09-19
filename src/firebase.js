import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDYM4z1pVNeINnbww6WdtYTk4t3ryFp6EE",
    authDomain: "reacttask102.firebaseapp.com",
    databaseURL: "https://reacttask102.firebaseio.com",
    projectId: "reacttask102",
    storageBucket: "reacttask102.appspot.com",
    messagingSenderId: "821366528487",
    appId: "1:821366528487:web:19b016c585b1271a134542",
    measurementId: "G-XF4PYVHWSF"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };