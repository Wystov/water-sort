import { UserInfo } from 'firebase/auth';
import { makeAutoObservable } from 'mobx';

import { UserData } from '@/types';

class User {
  profile: UserInfo | null = null;
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

  setUserProfile(profile: UserInfo | null) {
    this.profile = profile;
  }

  get userData() {
    return {
      coins: this.coins,
      wins: this.wins,
      perks: this.perks,
    };
  }

  setUserData(data: UserData) {
    this.coins = data.coins;
    this.wins = data.wins;
    this.perks = data.perks;
  }
}

export const user = new User();
