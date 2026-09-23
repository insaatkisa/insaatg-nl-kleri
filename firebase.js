import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "BURAYA_KENDI_API_KEYINIZI_YAPISTIRIN",
  authDomain: "insaat-gunlukleri.firebaseapp.com",
  projectId: "insaat-gunlukleri",
  storageBucket: "insaat-gunlukleri.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);