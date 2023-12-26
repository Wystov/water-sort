import { useRef } from 'react';

import { BottleProps } from '@/types';

import style from './Bottle.module.scss';

export const Bottle = ({ i, bottle, handleBottleClick }: BottleProps) => {
  const bottleRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      onClick={() => handleBottleClick(i, bottleRef)}
      className={style.bottle}
      ref={bottleRef}
    >
      {bottle.map(
        (color, j) =>
          color && (
            <div
              className={style.fill}
              style={{ backgroundColor: color }}
              key={j}
            />
          )
      )}
    </div>
  );
};
