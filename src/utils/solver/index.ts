import { BottleType } from '@/types';
import { isPourAllowed } from '@/utils/isPourAllowed';
import { isBottleSorted, isSolved } from '@/utils/isSolved';

import { getBottleWithCount } from '../getBottleWithCount';

type StateItem = { bottles: BottleType[]; moves: string[] };

export const solver = (originalBottles: BottleType[], bottleParts: number) => {
  const stack: StateItem[] = [
    { bottles: cloneBottles(originalBottles), moves: [] },
  ];
  const visitedStates = new Set<string>();
  const answer: {
    isSolvable: boolean;
    moves?: string[];
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

    for (let from = bottles.length - 1; from >= 0; from--) {
      if (!bottles[from].length) continue;

      for (let to = bottles.length - 1; to >= 0; to--) {
        const { isChanged, newBottles } = pour(from, to, bottles, bottleParts);
        if (isChanged) {
          stack.push({
            bottles: newBottles,
            moves: [...moves, `${from}, ${to}`],
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
  const newBottles = cloneBottles(bottles);
  while (isSolverPourAllowed(from, to, newBottles, bottleParts)) {
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
  if (!isPourAllowed(from, to, bottles, bottleParts)) return false;
  if (
    isBottleSorted(bottles[from]) &&
    (!bottles[to].length || !isBottleSorted(bottles[to]))
  )
    return false;
  const fromTopColorCount = getBottleWithCount(bottles[from]).at(-1)!.count;
  if (fromTopColorCount > bottleParts - bottles[to].length) return false;
  return true;
}

function cloneBottles(bottles: BottleType[]) {
  return bottles.map((bottle) => [...bottle]);
}
