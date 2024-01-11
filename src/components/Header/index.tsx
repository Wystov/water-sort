import { Link } from 'react-router-dom';

import style from './style.module.scss';

export const Header = () => {
  return (
    <header className={style.header}>
      <Link to="/">Game</Link>
      <Link to="/settings">Settings</Link>
    </header>
  );
};
