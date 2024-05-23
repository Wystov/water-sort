import { observer } from 'mobx-react-lite';

import { ArrowPathIcon, ForwardIcon } from '@heroicons/react/24/outline';

import { PERK_DESCRIPTION } from '@/constants';
import { game } from '@/store/Game';
import { user } from '@/store/User';
import { GameControlsProps } from '@/types';

import styles from './GameControls.module.scss';

export const GameControls = observer(function GameControls({
  resetPourFrom,
  fromBottom,
  setFromBottom,
}: GameControlsProps) {
  const { lvl, isWon, history } = game;
  const { perks: perkStore } = user;

  const handleReset = () => {
    resetPourFrom();
    game.clearHistory();
    game.setBottles();
  };

  const handleWin = () => {
    game.clearHistory();
    game.setLvl(lvl + 1);
  };
  const handleMoveBack = () => {
    if (perkStore.moveBack === 0) return;

    game.backInHistory();
    user.decreasePerk('moveBack');
  };

  const handlePourFromBottom = () => {
    setFromBottom(!fromBottom);
  };

  const handleAddBottle = () => {
    if (perkStore.addBottle === 0) return;

    game.addBottle();
    user.decreasePerk('addBottle');
  };

  const perksWithFuncs = {
    moveBack: {
      func: handleMoveBack,
      disabled: !history.length || perkStore.moveBack === 0,
    },
    pourFromBottom: {
      func: handlePourFromBottom,
      disabled: !fromBottom && perkStore.pourFromBottom === 0,
    },
    addBottle: {
      func: handleAddBottle,
      disabled: perkStore.addBottle === 0,
    },
  };

  // TODO: add help btn that calculates next move from solver

  return (
    <div className={styles.controls}>
      <button
        onClick={handleReset}
        className={styles.controlsButton}
        title="Restart"
      >
        <ArrowPathIcon />
      </button>
      {isWon ? (
        <>
          <button
            onClick={handleWin}
            className={styles.controlsButton}
            title="Next level"
          >
            <ForwardIcon />
          </button>
        </>
      ) : (
        <>
          {Object.entries(PERK_DESCRIPTION).map(([key, { title, icon }]) => {
            const typedKey = key as keyof typeof perkStore;
            const { func, disabled } =
              perksWithFuncs[typedKey as keyof typeof perksWithFuncs];
            const iconParams =
              key === 'pourFromBottom' && fromBottom
                ? { color: 'green' }
                : undefined;

            return (
              <button
                onClick={func}
                key={key}
                className={styles.controlsButton}
                disabled={disabled}
                title={title}
              >
                {perkStore[typedKey]}
                {icon(iconParams)}
              </button>
            );
          })}
        </>
      )}
    </div>
  );
});
