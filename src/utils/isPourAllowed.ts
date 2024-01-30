import { BottleType } from '@/types';

export const isPourAllowed = (
  from: number,
  to: number,
  bottles: BottleType[],
  bottleParts: number,
  fromBottom: boolean = false
): boolean => {
  if (
    from === to ||
    !bottles[from].length ||
    bottles[to].length === bottleParts ||
    (bottles[to].length &&
      bottles[to].at(-1) !== bottles[from].at(fromBottom ? 0 : -1))
  ) {
    return false;
  }
  return true;
};
