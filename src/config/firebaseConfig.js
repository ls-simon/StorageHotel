import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD6CDsoMdAYKjHSIhZwSTWayDYZ_ehN6sU",
  authDomain: "online-lagersystem.firebaseapp.com",
  databaseURL: "https://online-lagersystem.firebaseio.com",
  projectId: "online-lagersystem",
  storageBucket: "online-lagersystem.appspot.com",
  messagingSenderId: "839209706414"
};
firebase.initializeApp(config);

export default firebase;