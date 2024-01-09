import { useEffect, useRef, useState } from 'react';

import { Bottle } from '@/components/Bottle';
import {
  BottleType,
  GameProps,
  handleBottleClickType,
  pourFromType,
} from '@/types';
import { handleAnimation } from '@/utils/animations/handleAnimation';
import { moveBottle } from '@/utils/animations/moveBottle';
import { select } from '@/utils/animations/select';
import { createLvlData } from '@/utils/createLvlData';
import { isPourAllowed } from '@/utils/isPourAllowed';

export const Game = ({
  settings: { lvl, bottleParts, bottlesCount },
  setSettings,
}: GameProps) => {
  const [bottles, setBottles] = useState<BottleType[]>(() =>
    createLvlData(bottleParts, bottlesCount)
  );

  const isWon = bottles.every(
    (bottle) =>
      !bottle.length ||
      (bottle.length === bottleParts &&
        bottle.every((color) => color === bottle[0]))
  );

  const pourFrom = useRef<pourFromType>(null);

  const resetPourFrom = () => {
    if (pourFrom.current) {
      handleAnimation(pourFrom.current.element, select('reverse'));
      pourFrom.current = null;
    }
  };

  useEffect(() => {
    setBottles(createLvlData(bottleParts, bottlesCount));

    return resetPourFrom();
  }, [lvl, bottleParts, bottlesCount]);

  const handleWin = () => {
    setSettings((prev) => ({ ...prev, lvl: prev.lvl + 1 }));
  };

  const handleReset = () => {
    setBottles(createLvlData(bottleParts, bottlesCount));
    resetPourFrom();
  };

  const handleBottleClick: handleBottleClickType = (clicked, bottleRef) => {
    const clickedElement = bottleRef.current;
    if (!clickedElement) return;

    if (pourFrom.current === null && bottles[clicked].length) {
      handleAnimation(clickedElement, select());
      pourFrom.current = { i: clicked, element: clickedElement };
      return;
    }

    const fromElement = pourFrom?.current?.element;
    if (!fromElement) return;

    const newBottles = [...bottles];
    let isBottlesChanged = false;

    while (pourFrom.current !== null) {
      if (
        !isPourAllowed(pourFrom.current.i, clicked, newBottles, bottleParts)
      ) {
        !isBottlesChanged && resetPourFrom();
        break;
      }

      if (!isBottlesChanged) {
        handleAnimation(fromElement, moveBottle(fromElement, clickedElement));
        isBottlesChanged = true;
      }

      const moved = newBottles[pourFrom.current.i].pop();
      newBottles[clicked].push(moved ?? null);
    }

    isBottlesChanged && setBottles(newBottles);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Lvl {lvl}</h1>
      <div className="field">
        {bottles.map((bottle, i) => (
          <Bottle
            key={i}
            i={i}
            bottle={bottle}
            handleBottleClick={handleBottleClick}
            bottleParts={bottleParts}
          />
        ))}
        <button
          onClick={handleReset}
          style={{ position: 'absolute', left: 20, top: 20 }}
        >
          Reset
        </button>
      </div>
      {isWon && <button onClick={handleWin}>Next lvl</button>}
    </div>
  );
};
