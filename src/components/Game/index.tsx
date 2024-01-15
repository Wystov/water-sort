import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { ForwardIcon } from '@heroicons/react/24/outline';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { Bottle } from '@/components/Bottle';
import { game } from '@/store';
import { handleBottleClickType, pourFromType } from '@/types';
import { handleAnimation } from '@/utils/animations/handleAnimation';
import { moveBottle } from '@/utils/animations/moveBottle';
import { select } from '@/utils/animations/select';
import { isPourAllowed } from '@/utils/isPourAllowed';

import style from './style.module.scss';

export const Game = observer(() => {
  const { bottleParts, lvl, bottles, history } = game;

  const [fromBottom, setFromBottom] = useState(false);

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
    game.clearHistory();
    game.setLvl(lvl + 1);
  };

  const handleReset = () => {
    resetPourFrom();
    game.clearHistory();
    game.setBottles();
  };

  const handleBackInHistory = () => {
    game.backInHistory();
  };

  const handleAddBottle = () => {
    game.addBottle();
  };

  const handleWaterFromBottom = () => {
    setFromBottom(!fromBottom);
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
          ? handleAnimation(pourFrom.current.element, select('reverse'))
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
      <div className={style.controls}>
        {isWon ? (
          <button
            onClick={handleWin}
            className={style.controlsButton}
            title="Next level"
          >
            <ForwardIcon />
          </button>
        ) : (
          <>
            <button
              onClick={handleReset}
              className={style.controlsButton}
              title="Restart"
            >
              <ArrowPathIcon />
            </button>
            <button
              onClick={handleBackInHistory}
              className={style.controlsButton}
              disabled={!history.length}
              title="Move back"
            >
              <ArrowLeftCircleIcon />
            </button>
            <button
              onClick={handleWaterFromBottom}
              className={`${style.controlsButton} ${
                fromBottom ? style.controlsButtonActive : ''
              }`}
              title="Pour from bottom"
            >
              <ArrowDownCircleIcon
                style={{ color: fromBottom ? 'green' : '' }}
              />
            </button>
            <button
              onClick={handleAddBottle}
              className={style.controlsButton}
              title="Add bottle"
            >
              <PlusCircleIcon />
            </button>
          </>
        )}
      </div>
      <div className={style.field}>
        {bottles.map((bottle, i) => (
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
