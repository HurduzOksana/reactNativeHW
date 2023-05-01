import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfaayBP3L5xaFKwpEt7EMSuvqfKtHL85M",
  authDomain: "reactnativehurduz.firebaseapp.com",
  projectId: "reactnativehurduz",
  storageBucket: "reactnativehurduz.appspot.com",
  messagingSenderId: "155179175420",
  appId: "1:155179175420:web:3460b8b295032e72dcf679",
  measurementId: "G-Y8T1SQHHW9",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const dashboard = firebase.firestore();
const storage = firebase.storage();

export { auth, dashboard, storage };
