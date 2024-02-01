import { BottleType } from '@/types';

export const isBottleSorted = (bottle: BottleType) => {
  return new Set(bottle).size === 1;
};

export const isSolved = (bottles: BottleType[], bottleParts: number) => {
  return bottles.every(
    (bottle) =>
      !bottle.length ||
      (bottle.length === bottleParts && isBottleSorted(bottle))
  );
};
