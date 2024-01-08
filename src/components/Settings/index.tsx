import { useState } from 'react';

import { GameProps } from '@/types';

export const Settings = ({
  settings: { bottleParts, bottlesCount, colors },
  setSettings,
}: GameProps) => {
  const [parts, setParts] = useState(bottleParts);
  const [bottles, setBottles] = useState(bottlesCount);
  const [colorsCount, setColorsCount] = useState(colors);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSettings((prev) => ({
      ...prev,
      bottleParts: parts,
      bottlesCount: bottles,
      colors: colorsCount,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Bottles:
        <input
          type="number"
          value={bottles}
          onChange={(e) => setBottles(+e.target.value)}
        />
      </label>
      <label>
        Parts:
        <input
          type="number"
          value={parts}
          onChange={(e) => setParts(+e.target.value)}
        />
      </label>
      <label>
        Colors:
        <input
          type="number"
          value={colorsCount}
          onChange={(e) => setColorsCount(+e.target.value)}
        />
      </label>
      <button type="submit">Set</button>
    </form>
  );
};
