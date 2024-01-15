import { makeAutoObservable, toJS } from 'mobx';

import { BottleType, SetSettingsParams } from '@/types';
import { createLvlData } from '@/utils/createLvlData';

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

  setLvl(lvl: number) {
    this.lvl = lvl;
    this.setBottles();
  }

  setBottles(bottles?: BottleType[]) {
    this.bottles =
      bottles ??
      createLvlData(this.bottleParts, this.bottlesCount, this.colors);
  }

  setSettings({ colors, bottleParts, bottlesCount }: SetSettingsParams) {
    this.colors = colors;
    this.bottleParts = bottleParts;
    this.bottlesCount = bottlesCount;
    this.clearHistory();
    this.setBottles();
  }

  moveWater(from: number, to: number) {
    const moved = this.bottles[from].pop();
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
