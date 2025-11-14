import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6jr90-eY7kOLriEkYeoxEc2PzbjQ9xbQ",
  authDomain: "rowdypal-8db00.firebaseapp.com",
  projectId: "rowdypal-8db00",
  storageBucket: "rowdypal-8db00.firebasestorage.app",
  messagingSenderId: "649719210764",
  appId: "1:649719210764:web:787f47fe680e5c29329f29",
  measurementId: "G-PNE2BL1VV1"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);