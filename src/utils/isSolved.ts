import { BottleType } from '@/types';

export const isSolved = (bottles: BottleType[], bottleParts: number) => {
  return bottles.every(
    (bottle) =>
      !bottle.length ||
      (bottle.length === bottleParts &&
        bottle.every((color) => color === bottle[0]))
  );
};
