import firebase from 'firebase';


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaGJsEfmgY31bOj5-7oZSB16o-yNY3Obs",
  authDomain: "chatapp-firebase-44b98.firebaseapp.com",
  projectId: "chatapp-firebase-44b98",
  storageBucket: "chatapp-firebase-44b98.appspot.com",
  messagingSenderId: "625130820357",
  appId: "1:625130820357:web:453e169d579234d9015d6c"
};

// Initialize Firebase
  let app;
  if (firebase.apps.length === 0){
        app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app()
  }
  const auth =  firebase.auth();
  const db = app.firestore();
   export {auth, db} ;