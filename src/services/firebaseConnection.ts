import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBzUtA37Hj2Es0ejPR88usgSCh3KCqXcgI",
  authDomain: "webcarros-deb89.firebaseapp.com",
  projectId: "webcarros-deb89",
  storageBucket: "webcarros-deb89.appspot.com",
  messagingSenderId: "239989157216",
  appId: "1:239989157216:web:cb407d021302ff62a30205"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }