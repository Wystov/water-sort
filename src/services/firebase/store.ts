import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

import { game } from '@/store/Game';
import { user } from '@/store/User';
import { FirebaseData } from '@/types';

import { auth } from './auth';
import { app } from '.';

const db = getFirestore(app);

export const saveUserData = async () => {
  const id = auth.currentUser?.uid;
  if (!id) return;
  const data = {
    gameData: game.gameData,
    userData: user.userData,
  };
  await setDoc(doc(db, 'users', id), data);
};

export const loadUserData = async () => {
  const id = auth.currentUser?.uid;
  if (!id) return;

  const res = (await getDoc(doc(db, 'users', id))).data() as
    | FirebaseData
    | undefined;
  if (!res) return;

  game.setGameData(res.gameData);
  user.setUserData(res.userData);
};
