import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAGQ35bn4eC-oCb_QGEO7qnjX_nhqEixYM",
    authDomain: "alcoholic-5c67c.firebaseapp.com",
    projectId: "alcoholic-5c67c",
    storageBucket: "alcoholic-5c67c.appspot.com",
    messagingSenderId: "738165300307",
    appId: "1:738165300307:web:28fcfee97c0634799dfaa6",
    measurementId: "G-QY6VQCDZEW"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);