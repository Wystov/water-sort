import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router-dom';

import { SolverForm } from '@/components/SolverForm';
import { solverFormSubmit } from '@/types';
import { createLvlData } from '@/utils/createLvlData';
import { solver } from '@/utils/solver';

import styles from './Solver.module.scss';

export const Solver = observer(function Solver() {
  const { state } = useLocation();
  const [solverResult, setSolverResult] = useState('');

  if (!state?.access) return <Navigate to="/" />;

  // example use
  // const handleSolver = () => {
  //   console.time('solver');
  //   const { isSolvable, moves, stackCount } = solver(
  //     toJS(game.bottles),
  //     game.bottleParts
  //   );
  //   console.timeEnd('solver');
  //   console.log('solvable:', isSolvable, 'tries:', stackCount, 'moves:', moves);
  // };

  const handleSubmit: solverFormSubmit = (
    e,
    { parts, bottlesCount, colorsCount }
  ) => {
    e.preventDefault();

    const bottles = createLvlData(parts, bottlesCount, colorsCount);
    setSolverResult(JSON.stringify(solver(bottles, parts)));
  };

  return (
    <div className={styles.container}>
      <SolverForm handleSubmit={handleSubmit} />
      <div>{solverResult}</div>
    </div>
  );
});
