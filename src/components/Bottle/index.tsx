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

  return (
    <div
      onClick={() => handleBottleClick(i, bottleRef)}
      className={styles.bottle}
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
