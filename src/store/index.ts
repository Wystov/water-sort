import { makeAutoObservable } from 'mobx';

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
    this.setBottles();
  }

  moveWater(from: number, to: number) {
    const moved = this.bottles[from].pop();
    this.bottles[to].push(moved ?? null);
  }
}

export const game = new Game();
