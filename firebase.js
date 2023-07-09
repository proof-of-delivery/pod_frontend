// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
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
  appId: "1:484939878260:web:add0a3a24fdcaf13b96621",
  measurementId: "G-6SKEJD0VZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app)

export default db
