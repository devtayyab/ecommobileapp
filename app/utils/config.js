// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx0jEwjjuFGIgXmhB5khHrUjVx3I25oPY",
  authDomain: "buysell-6ce45.firebaseapp.com",
  projectId: "buysell-6ce45",
  storageBucket: "buysell-6ce45.appspot.com",
  messagingSenderId: "114024141796",
  appId: "1:114024141796:web:58c565cfe3da5cc83fedf1",
  measurementId: "G-PGKD0H04YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);