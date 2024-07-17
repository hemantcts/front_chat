// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyANjmvEbmPU8pcbPdW6lTOXAvrFaRBeOOQ",
  authDomain: "alertnotifications-16b91.firebaseapp.com",
  projectId: "alertnotifications-16b91",
  storageBucket: "alertnotifications-16b91.appspot.com",
  messagingSenderId: "631436307545",
  appId: "1:631436307545:web:7465f8bec369b7f04bd548"
};

export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

