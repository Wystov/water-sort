import { observer } from 'mobx-react-lite';

import {
  ArrowDownCircleIcon,
  ArrowLeftCircleIcon,
  ArrowPathIcon,
  ForwardIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

import { game } from '@/store';
import { GameControlsProps } from '@/types';

import style from './style.module.scss';

export const GameControls = observer(function GameControls({
  resetPourFrom,
  fromBottom,
  setFromBottom,
}: GameControlsProps) {
  const { lvl, isWon, history } = game;

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
    game.backInHistory();
  };

  const handleWaterFromBottom = () => {
    setFromBottom(!fromBottom);
  };

  const handleAddBottle = () => {
    game.addBottle();
  };

  return (
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
            className={style.controlsButton}
            title="Pour from bottom"
          >
            <ArrowDownCircleIcon style={{ color: fromBottom ? 'green' : '' }} />
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
  );
});
