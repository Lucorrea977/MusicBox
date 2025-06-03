// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDYDaw_jypJUXQHK5dEw8cfKeL8-OPnMP0",
  authDomain: "venova-music.firebaseapp.com",
  projectId: "venova-music",
  storageBucket: "venova-music.appspot.com",
  messagingSenderId: "488070761396",
  appId: "1:488070761396:web:1628410aa7e20e40e340e1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
