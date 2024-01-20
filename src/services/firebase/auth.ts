import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { toast } from 'react-toastify';

import { user } from '@/store/User';

import { app } from '.';

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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
