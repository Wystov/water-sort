import { observer } from 'mobx-react-lite';

import { GameControls } from '@/components/GameControls';
import { GameField } from '@/components/GameField';
import { winMessages } from '@/constants';
import { useBottle } from '@/hooks/useBottle';
import { game } from '@/store/Game';
import { getRandomNumber } from '@/utils/getRandomNumber';

import styles from './Game.module.scss';

export const Game = observer(function Game() {
  const { lvl, rewardValue, isWon } = game;
  const { fromBottom, setFromBottom, handleBottleClick, resetPourFrom } =
    useBottle(game);

  const winGreeting = winMessages[getRandomNumber(winMessages.length - 1)];
  const winText = `${winGreeting} +${rewardValue} coins.`;

  return (
    <main>
      <h1 className={styles.title}>{isWon ? winText : `Lvl ${lvl}`}</h1>
      <GameControls
        resetPourFrom={resetPourFrom}
        fromBottom={fromBottom}
        setFromBottom={setFromBottom}
      />
      <GameField handleBottleClick={handleBottleClick} />
    </main>
  );
});
