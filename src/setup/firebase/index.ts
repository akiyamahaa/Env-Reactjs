import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV3P_XczOZ0ftyVBPV7rDEZvFdB_27oPo",
  authDomain: "green-env-6de03.firebaseapp.com",
  projectId: "green-env-6de03",
  storageBucket: "green-env-6de03.appspot.com",
  messagingSenderId: "224052511911",
  appId: "1:224052511911:web:69f91929b05e01bc96c782",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export default firebaseApp;
