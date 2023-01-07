import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyCn85_cGJWLj4zi6tdibzggb85GIvyClB8",
  authDomain: "fb-crud-react-8e03f.firebaseapp.com",
  projectId: "fb-crud-react-8e03f",
  storageBucket: "fb-crud-react-8e03f.appspot.com",
  messagingSenderId: "1021420889412",
  appId: "1:1021420889412:web:a20ae5f7fe8c06ec39e311"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app