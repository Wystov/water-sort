import { makeAutoObservable } from 'mobx';

class User {
  coins = 1000;
  wins = 0;
  perks = {
    moveBack: 0,
    pourFromBottom: 0,
    addBottle: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  increaseWins() {
    this.wins += 1;
  }

  increaseCoins(value: number) {
    this.coins += value;
  }

  decreaseCoins(value: number) {
    this.coins -= value;
  }

  addPerk(perk: keyof typeof this.perks) {
    this.perks[perk] += 1;
  }

  decreasePerk(perk: keyof typeof this.perks) {
    if (this.perks[perk] > 0) {
      this.perks[perk] -= 1;
    }
  }
}

export const user = new User();
