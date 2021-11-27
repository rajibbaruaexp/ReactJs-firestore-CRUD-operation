import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import { getFirestore } from "firebase/firestore";

const initializeAuthentication = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return { app, db };
};

export default initializeAuthentication;
