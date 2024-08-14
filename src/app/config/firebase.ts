import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'event-driven-cesmac.firebaseapp.com',
  projectId: 'event-driven-cesmac',
  storageBucket: 'event-driven-cesmac.appspot.com',
  messagingSenderId: '349165313610',
  appId: '1:349165313610:web:f890e2f80cd84e885a10b3',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
