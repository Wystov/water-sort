import { COLORS } from '@/constants';
import { BottleType } from '@/types';

import { shuffleArray } from './shuffleArray';

export const createLvlData = (
  bottleParts: number,
  bottlesCount: number,
  colorsCount: number
) => {
  const fillList = [...COLORS]
    .sort(() => Math.random() - 0.5)
    .slice(0, colorsCount)
    .flatMap((color) => Array(bottleParts).fill(color));
  const shuffledArray = shuffleArray(fillList);
  const bottles: BottleType[] = Array(bottlesCount)
    .fill(null)
    .map((_, i) => shuffledArray.slice(i * bottleParts, (i + 1) * bottleParts));
  return bottles;
};
