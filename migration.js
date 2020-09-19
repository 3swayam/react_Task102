const firebase = require('firebase');
const movieList = require('./src/imdb.json');
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
//console.log(movieList);
function batchWrite() {
    var batch = db.batch();

    movieList.forEach((doc) => {
        doc.createdBy = "swayam"; doc.updatedBy = "swayam";
        var docRef = db.collection("movies").doc(); //automatically generate unique id
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
    db.collection("movies").doc("Toc0fpAtMYC8Q9G210zg").delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });//Toc0fpAtMYC8Q9G210zg
};

//add();

//deleteDoc();

batchWrite();
