import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiqsF729xdMno0zDONUbfHUuFT36eCxrA",
  authDomain: "uzventure-demo.firebaseapp.com",
  projectId: "uzventure-demo",
  storageBucket: "uzventure-demo.appspot.com",
  messagingSenderId: "1035138725655",
  appId: "1:1035138725655:web:77d8ea8ad8778ecda4e952",
  measurementId: "G-MYJK06SNXL",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
