import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { game } from '@/store';

import style from './Settings.module.scss';

export const Settings = () => {
  const navigate = useNavigate();
  const { bottleParts, bottlesCount, colors } = game;
  const [parts, setParts] = useState(bottleParts);
  const [bottles, setBottles] = useState(bottlesCount);
  const [colorsCount, setColorsCount] = useState(colors);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    game.setSettings({
      bottlesCount: bottles,
      bottleParts: parts,
      colors: colorsCount,
    });

    navigate('/');
  };

  return (
    <div className={style.container}>
      <p style={{ marginBottom: 20 }}>
        If you apply new settings your game will be reset
      </p>
      <form onSubmit={handleSubmit} className={style.form}>
        <label className={style.label}>
          Bottles:
          <input
            type="number"
            value={bottles}
            onChange={(e) => setBottles(+e.target.value)}
          />
        </label>
        <label className={style.label}>
          Parts:
          <input
            type="number"
            value={parts}
            onChange={(e) => setParts(+e.target.value)}
          />
        </label>
        <label className={style.label}>
          Colors:
          <input
            type="number"
            value={colorsCount}
            onChange={(e) => setColorsCount(+e.target.value)}
          />
        </label>
        <div className={style.btnContainer}>
          <button type="button" onClick={() => navigate('/')}>
            X
          </button>
          <button type="submit">V</button>
        </div>
      </form>
    </div>
  );
};
