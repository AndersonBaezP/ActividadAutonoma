

import { getDatabase} from "firebase/database";
import { getAuth} from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAreFRNLPqkqkJw62dWRlDWeEfp1rqiQmQ",
  authDomain: "autenticacion-c89ba.firebaseapp.com",
  projectId: "autenticacion-c89ba",
  storageBucket: "autenticacion-c89ba.appspot.com",
  messagingSenderId: "136451488597",
  appId: "1:136451488597:web:49d441916cb18afc7ccddc"
};

const app = initializeApp(firebaseConfig);
 export const db = getDatabase(app);
 export const storage = getStorage(app);
 //export const auth = getAuth(app);


 export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
 })