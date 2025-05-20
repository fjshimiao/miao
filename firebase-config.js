
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAwmiAqdGejYqG8IvvoWm-nzqGLyj5TQsE",
  authDomain: "miao-fang.firebaseapp.com",
  databaseURL: "https://miao-fang-default-rtdb.firebaseio.com",
  projectId: "miao-fang",
  storageBucket: "miao-fang.firebasestorage.app",
  messagingSenderId: "117680297121",
  appId: "1:117680297121:web:0c4b8f6e0a4a9c9918cce0",
  measurementId: "G-YRQ71R9NCR"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, push, onValue };
