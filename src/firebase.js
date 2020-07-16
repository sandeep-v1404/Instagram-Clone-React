import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDvesjOgg4uxnulzNQIoWzlWoVMrfg-aJI",
    authDomain: "instagram-clone-react-40d58.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-40d58.firebaseio.com",
    projectId: "instagram-clone-react-40d58",
    storageBucket: "instagram-clone-react-40d58.appspot.com",
    messagingSenderId: "14149955867",
    appId: "1:14149955867:web:2609880a36b0a4d84223be",
    measurementId: "G-C508ZLVK6X"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };