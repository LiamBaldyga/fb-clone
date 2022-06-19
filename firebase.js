import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCGN7AzNNLQ8yQ8m8GmA-NLerVqFPh5b2E',
  authDomain: 'facebook-clone-c43c5.firebaseapp.com',
  projectId: 'facebook-clone-c43c5',
  storageBucket: 'facebook-clone-c43c5.appspot.com',
  messagingSenderId: '203086198046',
  appId: '1:203086198046:web:6e1655f355e989b819450f',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
