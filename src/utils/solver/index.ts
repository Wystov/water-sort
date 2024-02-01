import { BottleType } from '@/types';
import { isPourAllowed } from '@/utils/isPourAllowed';
import { isSolved } from '@/utils/isSolved';

import { clone } from '../clone';
import { getBottleWithCount } from '../getBottleWithCount';

type StateItem = { bottles: BottleType[]; moves: [number, number][] };

export const solver = (originalBottles: BottleType[], bottleParts: number) => {
  const stack: StateItem[] = [{ bottles: clone(originalBottles), moves: [] }];
  const visitedStates = new Set<string>();
  const answer: {
    isSolvable: boolean;
    moves?: [number, number][];
    stackCount: number;
  } = {
    isSolvable: false,
    stackCount: 0,
  };

  while (stack.length) {
    const { bottles, moves } = stack.pop()!;
    answer.stackCount++;

    if (isSolved(bottles, bottleParts)) {
      answer.isSolvable = true;
      answer.moves = moves;
      return answer;
    }

    const stateItem = JSON.stringify(bottles);
    if (visitedStates.has(stateItem)) continue;

    visitedStates.add(stateItem);

    for (let from = 0; from < bottles.length; from++) {
      if (!bottles[from].length) continue;

      for (let to = 0; to < bottles.length; to++) {
        const { isChanged, newBottles } = pour(from, to, bottles, bottleParts);
        if (isChanged) {
          const newMoves = clone(moves);
          newMoves.push([from, to]);
          stack.push({
            bottles: newBottles,
            moves: newMoves,
          });
          break;
        }
      }
    }
  }

  return answer;
};

function pour(
  from: number,
  to: number,
  bottles: BottleType[],
  bottleParts: number
) {
  let isChanged = false;
  const newBottles = clone(bottles);
  while (
    isPourAllowed(from, to, newBottles, bottleParts) &&
    isSolverPourAllowed(from, to, newBottles, bottleParts)
  ) {
    newBottles[to].push(newBottles[from].pop()!);
    isChanged = true;
  }
  return { isChanged, newBottles };
}

function isSolverPourAllowed(
  from: number,
  to: number,
  bottles: BottleType[],
  bottleParts: number
) {
  if (
    isBottleSorted(bottles[from]) &&
    (!bottles[to].length || !isBottleSorted(bottles[to]))
  )
    return false;
  if (
    getBottleWithCount(bottles[from]).at(-1)!.count >
    bottleParts - bottles[to].length
  )
    return false;
  return true;
}

function isBottleSorted(bottle: BottleType) {
  return bottle.every((color) => color === bottle[0]);
}
