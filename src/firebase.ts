import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { toast } from 'react-toastify';

import { user } from './store/User';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const signInWithGoogle = () => {
  toast.promise(signInWithPopup(auth, provider), {
    pending: 'Signing in...',
    error: 'Failed to sign in',
  });
};

export const signOutUser = async () => {
  await signOut(auth);
  toast.info('See you later!', { icon: () => '👋' });
};

onAuthStateChanged(auth, (data) => {
  user.setUserProfile(data);
  if (data) toast.success(`Welcome back, ${data.displayName}`);
});
