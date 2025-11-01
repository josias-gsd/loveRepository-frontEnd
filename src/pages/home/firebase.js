// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwNy-I7uUE_5LOnz0KYf2ETj4GrlTD6i0",
  authDomain: "project-70027.firebaseapp.com",
  projectId: "project-70027",
  storageBucket: "project-70027.firebasestorage.app",
  messagingSenderId: "52329886031",
  appId: "1:52329886031:web:39e4ba27c34cb90382953a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export { ref, uploadBytes, getDownloadURL };
