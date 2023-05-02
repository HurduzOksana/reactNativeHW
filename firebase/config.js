// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";
// import "firebase/compat/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDfaayBP3L5xaFKwpEt7EMSuvqfKtHL85M",
//   authDomain: "reactnativehurduz.firebaseapp.com",
//   projectId: "reactnativehurduz",
//   storageBucket: "reactnativehurduz.appspot.com",
//   messagingSenderId: "155179175420",
//   appId: "1:155179175420:web:3460b8b295032e72dcf679",
//   measurementId: "G-Y8T1SQHHW9",
// };

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const dashboard = firebase.firestore();
// const storage = firebase.storage();

// export { auth, dashboard, storage };

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCByErhsq3LLp4EP43WAZbl0sxDejFNU9c",
  authDomain: "rn-social-7d807.firebaseapp.com",
  projectId: "rn-social-7d807",
  storageBucket: "rn-social-7d807.appspot.com",
  messagingSenderId: "128764754238",
  appId: "1:128764754238:web:8d086d87338273b326d46f",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
