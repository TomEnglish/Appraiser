// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5NlYLCdiBznVIZI_j_3RY32UqRWuBtlo",
  authDomain: "envenio-proj-1.firebaseapp.com",
  projectId: "envenio-proj-1",
  storageBucket: "envenio-proj-1.firebasestorage.app",
  messagingSenderId: "766775538969",
  appId: "1:766775538969:web:5ca1833de16351f89e4188"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances of Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

// Export the initialized app and service instances
export { app, db, auth };
