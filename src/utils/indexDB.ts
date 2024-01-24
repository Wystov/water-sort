import localforage from 'localforage';
import { debounce } from 'lodash';

import { game } from '@/store/Game';
import { user } from '@/store/User';

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'waterSortDB',
  storeName: 'waterSort',
});

export const loadGame = async () => {
  const id = user.profile?.uid ?? 'anonymous';
  const data: string | null = await localforage.getItem(id);
  if (!data) {
    user.setUserLoaded();
    return;
  }

  const decoded = JSON.parse(atob(data));

  game.setGameData(decoded.gameData);
  user.setUserData(decoded.userData);
  user.setUserLoaded();
};

const saveGame = () => {
  const data = btoa(
    JSON.stringify({
      gameData: game.gameData,
      userData: user.userData,
    })
  );
  const id = user.profile?.uid ?? 'anonymous';
  localforage.setItem(id, data);
};

export const debouncedSaveUserData = debounce(saveGame, 2000);
