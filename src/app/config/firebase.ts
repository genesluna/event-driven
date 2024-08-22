import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';

declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'event-driven-cesmac.firebaseapp.com',
  projectId: 'event-driven-cesmac',
  databaseURL: 'https://event-driven-cesmac-default-rtdb.firebaseio.com',
  storageBucket: 'event-driven-cesmac.appspot.com',
  messagingSenderId: '349165313610',
  appId: '1:349165313610:web:f890e2f80cd84e885a10b3',
};

if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}
const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcOfiwqAAAAAAlqkW02b4niLJsdaoDQVE5qrhHq'),
  isTokenAutoRefreshEnabled: true,
});

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fb = getDatabase(app);
