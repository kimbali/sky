import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC85AG4S_206W6YKSgEHL7Nb_AmCXKdtEE',
  authDomain: 'sky-market-place.firebaseapp.com',
  projectId: 'sky-market-place',
  storageBucket: 'sky-market-place.appspot.com',
  messagingSenderId: '597473499347',
  appId: '1:597473499347:web:4f202406f10a0d36f19c26',
};

initializeApp(firebaseConfig);
export const db = getFirestore();
