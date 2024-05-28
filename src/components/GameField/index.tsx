import { observer } from 'mobx-react-lite';

import { Bottle } from '@/components/Bottle';
import { game } from '@/store/Game';
import { GameFieldProps } from '@/types';

import styles from './GameField.module.scss';

export const GameField = observer(function GameField({
  handleBottleClick,
}: GameFieldProps) {
  const { bottlesWithCount, bottleParts } = game;
  return (
    <div className={styles.container}>
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
  );
});
