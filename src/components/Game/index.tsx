import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Bottle } from '@/components/Bottle';
import { GameControls } from '@/components/GameControls';
import { game } from '@/store';
import { handleBottleClickType, pourFromType } from '@/types';
import { handleAnimation } from '@/utils/animations/handleAnimation';
import { moveBottle } from '@/utils/animations/moveBottle';
import { select } from '@/utils/animations/select';
import { isPourAllowed } from '@/utils/isPourAllowed';

import style from './style.module.scss';

export const Game = observer(function Game() {
  const { bottleParts, lvl, bottles, bottlesWithCount } = game;

  const [fromBottom, setFromBottom] = useState(false);

  const pourFrom = useRef<pourFromType>(null);

  const resetPourFrom = () => {
    if (!pourFrom.current) return;
    handleAnimation(pourFrom.current.element, select('reverse'));
    pourFrom.current = null;
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

    let isBottlesChanged = false;

    while (pourFrom.current !== null) {
      if (
        !isPourAllowed(
          pourFrom.current.i,
          clicked,
          bottles,
          bottleParts,
          fromBottom
        )
      ) {
        !isBottlesChanged && resetPourFrom();
        break;
      }

      if (!isBottlesChanged) {
        fromBottom
          ? handleAnimation(fromElement, select('reverse'))
          : handleAnimation(
              fromElement,
              moveBottle(fromElement, clickedElement)
            );
        game.addToHistory();
        isBottlesChanged = true;
      }
      game.moveWater(pourFrom.current.i, clicked, fromBottom);
    }

    pourFrom.current = null;
    if (fromBottom) setFromBottom(false);
  };

  return (
    <main>
      <h1 style={{ textAlign: 'center' }}>Lvl {lvl}</h1>
      <GameControls
        resetPourFrom={resetPourFrom}
        fromBottom={fromBottom}
        setFromBottom={setFromBottom}
      />
      <div className={style.field}>
        {bottlesWithCount.map((bottle, i) => (
          <Bottle
            key={i}
            i={i}
            bottle={bottle}
            handleBottleClick={handleBottleClick}
            bottleParts={bottleParts}
          />
        ))}
      </div>
    </main>
  );
});
