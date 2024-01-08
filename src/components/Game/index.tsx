import { useEffect, useState } from 'react';

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
  const [bottles, setBottles] = useState<BottleType[]>(
    createLvlData(bottleParts, bottlesCount)
  );

  useEffect(() => {
    const generateNewLvl = () =>
      setBottles(createLvlData(bottleParts, bottlesCount));
    generateNewLvl();
  }, [lvl, bottleParts, bottlesCount]);

  const isWon = bottles.every(
    (bottle) =>
      !bottle.length ||
      (bottle.length === bottleParts &&
        bottle.every((color) => color === bottle[0]))
  );
  console.log(isWon);
  const [pourFrom, setPourFrom] = useState<pourFromType>(null);

  const handleWin = () => {
    setSettings((prev) => ({ ...prev, lvl: prev.lvl + 1 }));
  };

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
      if (!isPourAllowed(pourFrom.i, clicked, newBottles, bottleParts)) {
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
          onClick={() => setBottles(createLvlData(bottleParts, bottlesCount))}
          style={{ position: 'absolute', left: 20, top: 20 }}
        >
          Reset
        </button>
      </div>
      {isWon && <button onClick={handleWin}>Next lvl</button>}
    </div>
  );
};
