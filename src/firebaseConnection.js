import firebase from "firebase/app";
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyClq8GW45PSkOx40ywYVL6b5AcjcdvkkU0",
  authDomain: "appsujeito-572e9.firebaseapp.com",
  projectId: "appsujeito-572e9",
  storageBucket: "appsujeito-572e9.appspot.com",
  messagingSenderId: "78094096314",
  appId: "1:78094096314:web:d33678972ed7e92605ef83",
  measurementId: "G-S71QWYSBWP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;