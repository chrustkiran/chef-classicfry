import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBw5ZCxvpf_iW8rj2PR4bBYJxZXM3GNfMg",
  authDomain: "classic-fry.firebaseapp.com",
  projectId: "classic-fry",
  storageBucket: "classic-fry.firebasestorage.app",
  messagingSenderId: "1011748165923",
  appId: "1:1011748165923:web:daaf94aabcfaecb4651496",
  measurementId: "G-JSL0SLNKS5"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app)


export { db, ref, onValue };
