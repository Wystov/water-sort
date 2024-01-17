import { makeAutoObservable, reaction, toJS } from 'mobx';

import { BottleType, SetSettingsParams } from '@/types';
import { createLvlData } from '@/utils/createLvlData';
import { getBottleWithCount } from '@/utils/getBottleWithCount';

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

  get bottlesWithCount() {
    return this.bottles.map((bottle) => getBottleWithCount(bottle));
  }

  get isWon() {
    return this.bottles.every(
      (bottle) =>
        !bottle.length ||
        (bottle.length === this.bottleParts &&
          bottle.every((color) => color === bottle[0]))
    );
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
