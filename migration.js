const firebase = require('firebase');
const movieList = require('./src/imdb.json');
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
function batchWrite() {
    var batch = db.batch();

    movieList.forEach((doc) => {
        doc.createdBy = "swayam"; doc.updatedBy = "swayam";
        var docRef = db.collection("movies").doc();
        batch.set(docRef, doc);
    });
    // Commit the batch
    batch.commit().then(function () {
        // ...
        console.log("All movies are migrated to DB")
    });
}
function add() {
    db.collection("movies").add({
        createdBy: "swayam",
        updatedBy: "swayam",
        "99popularity": 89.0,
        "director": "Victor Fleming",
        "genre": [
            "Adventure",
            " Family",
            " Fantasy",
            " Musical"
        ],
        "imdb_score": 8.3,
        "name": "The Wizard of Oz"
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });


};

function deleteDoc() {
    db.collection("movies").doc("QkfLjZPsgQDcYcHTNzad").delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });//
};

//add();

//deleteDoc();

batchWrite();
