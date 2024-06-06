import { makeAutoObservable, reaction, toJS } from 'mobx';

import { COLORS } from '@/constants';
import { BottleType, GameData, SetSettingsParams } from '@/types';
import { createLvlData } from '@/utils/createLvlData';
import { getBottleWithCount } from '@/utils/getBottleWithCount';
import { debouncedSaveUserData } from '@/utils/indexDB';
import { isSolved } from '@/utils/isSolved';

import { user } from './User';

class Game {
  lvl = 1;
  colors = 2;
  bottleParts = 2;
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
    this.colors = 2;
    this.bottleParts = 2;
    this.bottles = createLvlData(
      this.bottleParts,
      this.bottlesCount,
      this.colors
    );
    this.history = [];
  }

  get bottlesCount() {
    const { lvl, colors } = this;
    return lvl < 3 ? colors + 1 : colors + 2;
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

  setGameData({ lvl, colors, bottleParts, bottles, history }: GameData) {
    this.lvl = lvl;
    this.colors = colors;
    this.bottleParts = bottleParts;
    this.bottles = Array.isArray(bottles) ? bottles : JSON.parse(bottles);
    this.history = Array.isArray(history) ? history : JSON.parse(history);
  }

  get bottlesWithCount() {
    return this.bottles.map((bottle) => getBottleWithCount(bottle));
  }

  get isWon() {
    return isSolved(this.bottles, this.bottleParts);
  }

  get rewardValue() {
    return this.colors * this.bottleParts + this.lvl;
  }

  setLvl(lvl: number) {
    this.lvl = lvl;
    this.increaseDifficulty(lvl);
    this.setBottles();
  }

  increaseDifficulty(lvl: number) {
    if (lvl < 4) this.bottleParts += 1;
    if (lvl === 5) this.colors += 1;
    if (lvl % 10 === 0 && this.colors < COLORS.length) {
      this.colors += 1;
      return;
    }

    if (lvl % 15 === 0) this.bottleParts += 1;
  }

  setBottles(bottles?: BottleType[]) {
    this.bottles =
      bottles ??
      createLvlData(this.bottleParts, this.bottlesCount, this.colors);
  }

  addBottle() {
    this.bottles.push([]);
  }

  setSettings({ colors, bottleParts }: SetSettingsParams) {
    this.colors = colors;
    this.bottleParts = bottleParts;
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
export type GameType = typeof game;

reaction(
  () => game.isWon,
  (isWon) => {
    if (isWon) {
      user.increaseWins();
      user.increaseCoins(game.rewardValue);
    }
  }
);

reaction(
  () => game.bottles,
  () => {
    debouncedSaveUserData();
  }
);
