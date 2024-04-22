import { useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { observer } from 'mobx-react-lite';

import { BottleProps } from '@/types';

import styles from './Bottle.module.scss';

export const Bottle = observer(function Bottle({
  i,
  bottle,
  bottleParts,
  handleBottleClick,
}: BottleProps) {
  const bottleRef = useRef<HTMLDivElement | null>(null);

  const isSorted = bottle.length === 1 && bottle[0].count === bottleParts;

  return (
    <div
      onClick={isSorted ? undefined : () => handleBottleClick(i, bottleRef)}
      className={styles.bottle}
      style={{
        cursor: isSorted ? 'default' : 'pointer',
        borderTopWidth: isSorted ? '10px' : '0',
      }}
      ref={bottleRef}
    >
      <AnimatePresence>
        {bottle.map(
          ({ color, count }, j) =>
            color && (
              <m.div
                className={styles.fill}
                style={{
                  backgroundColor: color,
                }}
                key={j + color + count}
                transition={{ duration: 0.5 }}
                initial={{ maxHeight: '0%' }}
                animate={{ maxHeight: `${(100 / bottleParts) * count}%` }}
                exit={{ maxHeight: '0%' }}
              />
            )
        )}
      </AnimatePresence>
    </div>
  );
});
