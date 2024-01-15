import { useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';

import { BottleColorsCountType, BottleProps } from '@/types';

import style from './Bottle.module.scss';

export const Bottle = ({
  i,
  bottle,
  bottleParts,
  handleBottleClick,
}: BottleProps) => {
  const bottleRef = useRef<HTMLDivElement | null>(null);

  const bottleWithCount = bottle.reduce((acc, color) => {
    if (!color) return acc;
    const prev = acc.at(-1);
    if (prev && prev.color === color) {
      prev.count++;
      return acc;
    }
    acc.push({ color, count: 1 });
    return acc;
  }, [] as BottleColorsCountType[]);

  return (
    <div
      onClick={() => handleBottleClick(i, bottleRef)}
      className={style.bottle}
      ref={bottleRef}
    >
      <AnimatePresence>
        {bottleWithCount.map(
          ({ color, count }, j) =>
            color && (
              <m.div
                className={style.fill}
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
};
