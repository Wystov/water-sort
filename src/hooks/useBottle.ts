import { useCallback, useRef, useState } from 'react';

import { game, GameType } from '@/store/Game';
import { user } from '@/store/User';
import { handleBottleClickType, pourFromType } from '@/types';
import { handleAnimation } from '@/utils/animations/handleAnimation';
import { moveBottle } from '@/utils/animations/moveBottle';
import { select } from '@/utils/animations/select';
import { debouncedSaveUserData } from '@/utils/indexDB';
import { isPourAllowed } from '@/utils/isPourAllowed';

export const useBottle = (state: GameType) => {
  const { bottleParts, bottles } = state;
  const [fromBottom, setFromBottom] = useState(false);
  const pourFrom = useRef<pourFromType>(null);

  const resetPourFrom = useCallback(() => {
    if (!pourFrom.current) return;
    handleAnimation(pourFrom.current.element, select('reverse'));
    pourFrom.current = null;
  }, []);

  const handleBottleClick: handleBottleClickType = useCallback(
    (clicked, bottleRef) => {
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
          if (!isBottlesChanged) resetPourFrom();
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

      if (isBottlesChanged) {
        debouncedSaveUserData();
        if (fromBottom) {
          user.decreasePerk('pourFromBottom');
          setFromBottom(false);
        }
      }
    },
    [bottles, bottleParts, fromBottom, resetPourFrom]
  );

  return {
    fromBottom,
    setFromBottom,
    handleBottleClick,
    resetPourFrom,
  };
};
