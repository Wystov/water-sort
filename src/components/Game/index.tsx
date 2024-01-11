import { useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { Bottle } from '@/components/Bottle';
import { game } from '@/store';
import { handleBottleClickType, pourFromType } from '@/types';
import { handleAnimation } from '@/utils/animations/handleAnimation';
import { moveBottle } from '@/utils/animations/moveBottle';
import { select } from '@/utils/animations/select';
import { isPourAllowed } from '@/utils/isPourAllowed';

export const Game = observer(() => {
  const { bottleParts, lvl, bottles } = game;

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

  const handleWin = () => {
    game.setLvl(lvl + 1);
  };

  const handleReset = () => {
    resetPourFrom();
    game.setBottles();
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
      game.moveWater(pourFrom.current.i, clicked);
    }

    isBottlesChanged && game.setBottles(newBottles);
    pourFrom.current = null;
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
          style={{ position: 'absolute', left: 20, top: 150 }}
        >
          Reset
        </button>
      </div>
      {isWon && <button onClick={handleWin}>Next lvl</button>}
    </div>
  );
});
