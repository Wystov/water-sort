import { useState } from 'react';

import { Bottle } from '@/components/Bottle';
import { BOTTLE_PARTS, BOTTLES_COUNT, COLORS } from '@/constants';
import { BottleType, handleBottleClickType, pourFromType } from '@/types';
import { handleAnimation } from '@/utils/animations/handleAnimation';
import { moveBottle } from '@/utils/animations/moveBottle';
import { select } from '@/utils/animations/select';
import { isPourAllowed } from '@/utils/isPourAllowed';
import { shuffleArray } from '@/utils/shuffleArray';

export const App = () => {
  const initBottles = () => {
    const fillList = COLORS.flatMap((color) => Array(BOTTLE_PARTS).fill(color));
    const shuffledArray = shuffleArray(fillList);
    const bottles: BottleType[] = Array(BOTTLES_COUNT)
      .fill(null)
      .map((_, i) =>
        shuffledArray.slice(i * BOTTLE_PARTS, (i + 1) * BOTTLE_PARTS)
      );
    return bottles;
  };

  const [bottles, setBottles] = useState<BottleType[]>(initBottles());
  const [pourFrom, setPourFrom] = useState<pourFromType>(null);

  const handleBottleClick: handleBottleClickType = (clicked, bottleRef) => {
    const clickedElement = bottleRef.current;
    if (!clickedElement) return;

    if (pourFrom === null && bottles[clicked].length) {
      handleAnimation(clickedElement, select());
      setPourFrom({ i: clicked, element: clickedElement });
      return;
    }

    const fromElement = pourFrom?.element;
    if (!fromElement) return;

    const newBottles = [...bottles];
    let isAnimated = false;

    while (pourFrom !== null) {
      if (!isPourAllowed(pourFrom.i, clicked, newBottles)) {
        !isAnimated && handleAnimation(fromElement, select('reverse'));
        setPourFrom(null);
        return;
      }

      if (!isAnimated) {
        handleAnimation(fromElement, moveBottle(fromElement, clickedElement));
        isAnimated = true;
      }

      const moved = newBottles[pourFrom.i].pop();
      newBottles[clicked].push(moved ?? null);
    }

    setBottles(newBottles);
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
      <button
        onClick={() => setBottles(initBottles())}
        style={{ position: 'absolute', left: 20, top: 20 }}
      >
        Reset
      </button>
    </div>
  );
};
