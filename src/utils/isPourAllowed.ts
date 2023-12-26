import { BOTTLE_PARTS } from '@/constants';
import { BottleType } from '@/types';

export const isPourAllowed = (
  from: number,
  to: number,
  bottles: BottleType[]
): boolean => {
  if (
    from === to ||
    bottles[to].length === BOTTLE_PARTS ||
    (bottles[to].length && bottles[to].at(-1) !== bottles[from].at(-1))
  ) {
    return false;
  }
  return true;
};
