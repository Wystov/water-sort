import { useState } from 'react';

import { Bottle } from './components/Bottle';
import { shuffleArray } from './utils/shuffleArray';
import { BottleType, ColorsType } from './types';

const bottlesCount = 5;
const colors: ColorsType[] = ['blue', 'green', 'red'];
const bottleParts = 4;

export const App = () => {
  const initBottles = () => {
    const fillList = colors.flatMap((color) => Array(bottleParts).fill(color));
    const shuffledArray = shuffleArray(fillList);
    const bottles = Array(bottlesCount)
      .fill(null)
      .map((_, i) =>
        shuffledArray.slice(i * bottleParts, (i + 1) * bottleParts)
      );
    return bottles;
  };

  const [bottles, setBottles] = useState<BottleType[]>(initBottles());
  const [pourFrom, setPourFrom] = useState<number | null>(null);

  const handleBottleClick = (i: number) => {
    if (pourFrom === null && bottles[i].length) return setPourFrom(i);
    while (pourFrom !== null) {
      switch (true) {
        case pourFrom === i:
        case bottles[i].length === bottleParts:
        case bottles[i].length &&
          bottles[i].at(-1) !== bottles[pourFrom!].at(-1):
          return setPourFrom(null);
        default:
          const newBottles = [...bottles];
          const moved = newBottles[pourFrom].pop();
          newBottles[i].push(moved ?? null);
          setBottles(newBottles);
      }
    }
  };

  return (
    <div className="field">
      {bottles.map((bottle, i) => (
        <Bottle
          key={i}
          i={i}
          bottle={bottle}
          handleBottleClick={handleBottleClick}
        />
      ))}
    </div>
  );
};
