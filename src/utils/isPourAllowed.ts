import { BottleType } from '@/types';

export const isPourAllowed = (
  from: number,
  to: number,
  bottles: BottleType[],
  bottleParts: number
): boolean => {
  if (
    from === to ||
    bottles[to].length === bottleParts ||
    (bottles[to].length && bottles[to].at(-1) !== bottles[from].at(-1))
  ) {
    return false;
  }
  return true;
};
