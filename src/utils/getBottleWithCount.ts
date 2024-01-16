import { BottleColorsCountType, BottleType } from '@/types';

export const getBottleWithCount = (bottle: BottleType) =>
  bottle.reduce((acc, color) => {
    if (!color) return acc;
    const prev = acc.at(-1);
    if (prev && prev.color === color) {
      prev.count++;
      return acc;
    }
    acc.push({ color, count: 1 });
    return acc;
  }, [] as BottleColorsCountType[]);
