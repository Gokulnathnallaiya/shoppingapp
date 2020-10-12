import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBqAqQ8sopUkNJ4l5eHl_ZUiHAR8hGi7N4",
  authDomain: "ecom-react-c2c57.firebaseapp.com",
  databaseURL: "https://ecom-react-c2c57.firebaseio.com",
  projectId: "ecom-react-c2c57",
  storageBucket: "ecom-react-c2c57.appspot.com",
  messagingSenderId: "64432453403",
  appId: "1:64432453403:web:a1701703d30ce12312c5be",
  measurementId: "G-0TNF7H2DZ8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;