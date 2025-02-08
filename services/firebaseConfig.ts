import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdwdp7xSELJ4eKx4xWCR9yDLwCCEnylcg",
  authDomain: "arghoritma.firebaseapp.com",
  projectId: "arghoritma",
  storageBucket: "arghoritma.firebasestorage.app",
  messagingSenderId: "515619938541",
  appId: "1:515619938541:web:fd6a20c86acd94e6ceace4",
  measurementId: "G-SCSJ071ET6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
