import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { SolverFormProps } from '@/types';

import { Button } from '../UI/Button';

import styles from './SolverForm.module.scss';

export const SolverForm = observer(function SolverForm({
  handleSubmit,
}: SolverFormProps) {
  const navigate = useNavigate();
  const [bottlesCount, setBottlesCount] = useState(3);
  const [colorsCount, setColorsCount] = useState(2);
  const [parts, setParts] = useState(2);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, { parts, bottlesCount, colorsCount })}
      className={styles.form}
    >
      <label className={styles.label}>
        Parts:
        <input
          type="number"
          value={parts}
          onChange={(e) => setParts(+e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Colors:
        <input
          type="number"
          value={colorsCount}
          onChange={(e) => setColorsCount(+e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Bottles:
        <input
          type="number"
          value={bottlesCount}
          onChange={(e) => setBottlesCount(+e.target.value)}
        />
      </label>
      <div className={styles.btnContainer}>
        <Button onClick={() => navigate('/')}>Back to game</Button>
        <Button type="submit" onClick={() => {}}>
          Solve it!
        </Button>
      </div>
    </form>
  );
});
