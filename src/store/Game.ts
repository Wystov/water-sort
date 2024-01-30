import { makeAutoObservable, reaction, toJS } from 'mobx';

import { BottleType, GameData, SetSettingsParams } from '@/types';
import { createLvlData } from '@/utils/createLvlData';
import { getBottleWithCount } from '@/utils/getBottleWithCount';
import { debouncedSaveUserData } from '@/utils/indexDB';
import { isSolved } from '@/utils/isSolved';

import { user } from './User';

class Game {
  lvl = 1;
  colors = 3;
  bottleParts = 4;
  bottlesCount = 5;
  bottles: BottleType[] = createLvlData(
    this.bottleParts,
    this.bottlesCount,
    this.colors
  );
  history: BottleType[][] = [];

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this.lvl = 1;
    this.colors = 3;
    this.bottleParts = 4;
    this.bottlesCount = 5;
    this.bottles = createLvlData(
      this.bottleParts,
      this.bottlesCount,
      this.colors
    );
    this.history = [];
  }
  get gameData() {
    return {
      lvl: this.lvl,
      colors: this.colors,
      bottleParts: this.bottleParts,
      bottlesCount: this.bottlesCount,
      bottles: this.bottles,
      history: this.history,
    };
  }

  setGameData({
    lvl,
    colors,
    bottleParts,
    bottlesCount,
    bottles,
    history,
  }: GameData) {
    this.lvl = lvl;
    this.colors = colors;
    this.bottleParts = bottleParts;
    this.bottlesCount = bottlesCount;
    this.bottles = Array.isArray(bottles) ? bottles : JSON.parse(bottles);
    this.history = Array.isArray(history) ? history : JSON.parse(history);
  }

  get bottlesWithCount() {
    return this.bottles.map((bottle) => getBottleWithCount(bottle));
  }

  get isWon() {
    return isSolved(this.bottles, this.bottleParts);
  }

  setLvl(lvl: number) {
    this.lvl = lvl;
    this.setBottles();
  }

  setBottles(bottles?: BottleType[]) {
    this.bottles =
      bottles ??
      createLvlData(this.bottleParts, this.bottlesCount, this.colors);
  }

  addBottle() {
    this.bottles.push([]);
  }

  setSettings({ colors, bottleParts, bottlesCount }: SetSettingsParams) {
    this.colors = colors;
    this.bottleParts = bottleParts;
    this.bottlesCount = bottlesCount;
    this.clearHistory();
    this.setBottles();
  }

  moveWater(from: number, to: number, fromBottom = false) {
    const moved = fromBottom
      ? this.bottles[from].shift()
      : this.bottles[from].pop();
    this.bottles[to].push(moved ?? null);
  }

  addToHistory() {
    this.history.push(toJS(this.bottles));
  }

  backInHistory() {
    const bottles = this.history.pop();
    if (bottles) this.setBottles(bottles);
  }

  clearHistory() {
    this.history.length = 0;
  }
}

export const game = new Game();

reaction(
  () => game.isWon,
  (isWon) => {
    if (isWon) {
      user.increaseWins();
      user.increaseCoins(100);
    }
  }
);

reaction(
  () => game.bottles,
  () => {
    debouncedSaveUserData();
  }
);
