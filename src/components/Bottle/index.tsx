import { BottleProps } from '@/types';

import style from './Bottle.module.scss';

export const Bottle = ({ i, bottle, handleBottleClick }: BottleProps) => {
  return (
    <div onClick={() => handleBottleClick(i)} className={style.bottle}>
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
