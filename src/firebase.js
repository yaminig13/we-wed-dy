// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNwC0q01cQL8U-zf4z9w-NpQQdnauu3yw",
  authDomain: "we-wed.firebaseapp.com",
  projectId: "we-wed",
  storageBucket: "we-wed.firebasestorage.app",
  messagingSenderId: "449068310010",
  appId: "1:449068310010:web:9d36474a2b7492e9141843",
  measurementId: "G-61RG4DLEGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };