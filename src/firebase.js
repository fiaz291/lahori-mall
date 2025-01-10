import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUAzBWhSPcmtog3f3xz102SbqcHpBXt6U",
  authDomain: "lahorimall.firebaseapp.com",
  projectId: "lahorimall",
  storageBucket: "lahorimall.appspot.com",
  messagingSenderId: "647156358127",
  appId: "1:647156358127:web:6d9f982484a2756b2bf41a",
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
export { storage, auth };
