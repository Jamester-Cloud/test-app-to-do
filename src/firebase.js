import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCn85_cGJWLj4zi6tdibzggb85GIvyClB8",
  authDomain: "fb-crud-react-8e03f.firebaseapp.com",
  projectId: "fb-crud-react-8e03f",
  storageBucket: "fb-crud-react-8e03f.appspot.com",
  messagingSenderId: "1021420889412",
  appId: "1:1021420889412:web:a20ae5f7fe8c06ec39e311"
};
//app
const app = initializeApp(firebaseConfig);
//Db
export const db = getFirestore(app);

//Auth
export const auth = getAuth(app);
//App
export default app