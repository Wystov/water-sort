import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { Cog6ToothIcon } from '@heroicons/react/24/outline';

import style from './style.module.scss';

export const Header = observer(function Header() {
  return (
    <header className={style.header}>
      <Link to="/settings" title="Settings">
        <Cog6ToothIcon style={{ width: 32, color: 'white' }} />
      </Link>
    </header>
  );
});
