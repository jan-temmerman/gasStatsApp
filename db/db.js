import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCua6kCxS6sUwBXCoxwPMucfHvz3SoKXh0",
    authDomain: "gasstats-c9506.firebaseapp.com",
    databaseURL: "https://gasstats-c9506.firebaseio.com",
    projectId: "gasstats-c9506",
    storageBucket: "gasstats-c9506.appspot.com",
    messagingSenderId: "990251820902",
    appId: "1:990251820902:web:6fc7cb1090506b90698aa7"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default db = firebase.database()