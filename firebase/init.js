import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBaLfGE7KFhs1vl4I-oWMOb3708Wnoz-Zc",
  authDomain: "dottrait.firebaseapp.com",
  databaseURL: "https://dottrait.firebaseio.com",
  projectId: "dottrait",
  storageBucket: "dottrait.appspot.com",
  messagingSenderId: "535661812850"
};


const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()

