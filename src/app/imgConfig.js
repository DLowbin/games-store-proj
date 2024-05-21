import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCaul-bLTwQF7IQkcV9Ea5iz5Dm0FnNqTc',
  authDomain: 'games-store-project-eb08a.firebaseapp.com',
  databaseURL: 'https://games-store-project-eb08a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'games-store-project-eb08a',
  storageBucket: 'games-store-project-eb08a.appspot.com',
  messagingSenderId: '64049139729',
  appId: '1:64049139729:web:0d09a717dd47e42662e1b0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
