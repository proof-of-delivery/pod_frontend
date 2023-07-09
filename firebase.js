// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnItBJ30L928Y3suI3BDEMuqV6u_8zA3E",
  authDomain: "pod-mock.firebaseapp.com",
  databaseURL: "https://pod-mock-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pod-mock",
  storageBucket: "pod-mock.appspot.com",
  messagingSenderId: "484939878260",
  appId: "1:484939878260:web:7af3e9ed669caf19b96621",
  measurementId: "G-HM5KZ5WEWN"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export default firebase;