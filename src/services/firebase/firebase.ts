import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhG6R_Kv1P7MnUMy-C424Fyc6fMXY72Zg",
    authDomain: "my-e-commerce-auth.firebaseapp.com",
    projectId: "my-e-commerce-auth",
    storageBucket: "my-e-commerce-auth.firebasestorage.app",
    messagingSenderId: "839333124766",
    appId: "1:839333124766:web:002a307a41c17183e8398f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);