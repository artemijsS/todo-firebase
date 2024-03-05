import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { collection, getFirestore, initializeFirestore } from "@firebase/firestore";
import { DBEnum } from "@/enums";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_FIREBASE_APP_ID,
};

const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth();
const db = getFirestore();
const usersCol = collection(db, DBEnum.users)
const todosCol = collection(db, DBEnum.todos)

export { firebase_app, auth, db, usersCol, todosCol };