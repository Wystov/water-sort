import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Bottle } from '@/components/Bottle';
import { GameControls } from '@/components/GameControls';
import { game } from '@/store/Game';
import { user } from '@/store/User';
import { handleBottleClickType, pourFromType } from '@/types';
import { handleAnimation } from '@/utils/animations/handleAnimation';
import { moveBottle } from '@/utils/animations/moveBottle';
import { select } from '@/utils/animations/select';
import { debouncedSaveUserData } from '@/utils/indexDB';
import { isPourAllowed } from '@/utils/isPourAllowed';

import styles from './Game.module.scss';

export const Game = observer(function Game() {
  const { bottleParts, lvl, bottles, bottlesWithCount, rewardValue, isWon } =
    game;

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

    isBottlesChanged && debouncedSaveUserData();

    if (isBottlesChanged && fromBottom) {
      user.decreasePerk('pourFromBottom');
      setFromBottom(false);
    }
  };

  let headerText = `Lvl ${lvl}`;
  if (isWon) headerText += ` is solved! +${rewardValue} coins.`;

  return (
    <main>
      <h1 style={{ textAlign: 'center' }}>{headerText}</h1>
      <GameControls
        resetPourFrom={resetPourFrom}
        fromBottom={fromBottom}
        setFromBottom={setFromBottom}
      />
      <div className={styles.field}>
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
