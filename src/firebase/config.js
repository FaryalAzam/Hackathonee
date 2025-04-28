// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDXsRKmmDlRpTXusiBVTjs98PGoPAfiriw",
//   authDomain: "task-tracker-d091b.firebaseapp.com",
//   projectId: "task-tracker-d091b",
//   storageBucket: "task-tracker-d091b.appspot.com",
//   messagingSenderId: "377771535277",
//   appId: "1:377771535277:web:655b4c74f000f8f421cf24"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);



// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDXsRKmmDlRpTXusiBVTjs98PGoPAfiriw",
    authDomain: "task-tracker-d091b.firebaseapp.com",
    projectId: "task-tracker-d091b",
    storageBucket: "task-tracker-d091b.appspot.com",
    messagingSenderId: "377771535277",
    appId: "1:377771535277:web:655b4c74f000f8f421cf24"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Exports
export { auth, db };

