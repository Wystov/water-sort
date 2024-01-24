import { observer } from 'mobx-react-lite';

import {
  ArrowDownCircleIcon,
  ArrowLeftCircleIcon,
  ArrowPathIcon,
  ForwardIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

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
  const { perks } = user;

  const handleReset = () => {
    resetPourFrom();
    game.clearHistory();
    game.setBottles();
  };

  const handleWin = () => {
    game.clearHistory();
    game.setLvl(lvl + 1);
  };
  const handleBackInHistory = () => {
    if (perks.moveBack === 0) return;

    game.backInHistory();
    user.decreasePerk('moveBack');
  };

  const handleWaterFromBottom = () => {
    setFromBottom(!fromBottom);
  };

  const handleAddBottle = () => {
    if (perks.addBottle === 0) return;

    game.addBottle();
    user.decreasePerk('addBottle');
  };

  return (
    <div className={styles.controls}>
      {isWon ? (
        <button
          onClick={handleWin}
          className={styles.controlsButton}
          title="Next level"
        >
          <ForwardIcon />
        </button>
      ) : (
        <>
          <button
            onClick={handleReset}
            className={styles.controlsButton}
            title="Restart"
          >
            <ArrowPathIcon />
          </button>
          <button
            onClick={handleBackInHistory}
            className={styles.controlsButton}
            disabled={!history.length || perks.moveBack === 0}
            title="Move back"
          >
            {perks.moveBack}
            <ArrowLeftCircleIcon />
          </button>
          <button
            onClick={handleWaterFromBottom}
            className={styles.controlsButton}
            title="Pour from bottom"
            disabled={!fromBottom && perks.pourFromBottom === 0}
          >
            {perks.pourFromBottom}
            <ArrowDownCircleIcon style={{ color: fromBottom ? 'green' : '' }} />
          </button>
          <button
            onClick={handleAddBottle}
            className={styles.controlsButton}
            title="Add bottle"
            disabled={perks.addBottle === 0}
          >
            {perks.addBottle}
            <PlusCircleIcon />
          </button>
        </>
      )}
    </div>
  );
});
