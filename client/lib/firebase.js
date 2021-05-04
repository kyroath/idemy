import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9Vg_pEmKIqelh2ixZl7utDmMm2XC7z20",
  authDomain: "todo-social-f0f20.firebaseapp.com",
  projectId: "todo-social-f0f20",
  storageBucket: "todo-social-f0f20.appspot.com",
  messagingSenderId: "167556547191",
  appId: "1:167556547191:web:53d8f259571c25a2053c72",
  measurementId: "G-ZSW1LDF4FQ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
