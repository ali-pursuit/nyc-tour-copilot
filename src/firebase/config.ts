import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBDV2ID-9Nv0NHS6q3vYktL5Tciea8J-SE",
  authDomain: "nyc-tour-copilot.firebaseapp.com",
  projectId: "nyc-tour-copilot",
  storageBucket: "nyc-tour-copilot.firebasestorage.app",
  messagingSenderId: "410878751200",
  appId: "1:410878751200:web:9d73fe9db278747e49bb85"

};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 