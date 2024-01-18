import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import {
  Cog6ToothIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import { Stats } from '@/components/Stats';

import style from './style.module.scss';

export const Header = observer(function Header() {
  return (
    <header className={style.header}>
      <div className={style.linksContainer}>
        <Link to="/account" title="Account">
          <UserCircleIcon className={style.btn} />
        </Link>
        <Stats />
      </div>
      <div className={style.linksContainer}>
        <Link to="/shop" title="Shop">
          <ShoppingCartIcon className={style.btn} />
        </Link>
        <Link to="/settings" title="Settings">
          <Cog6ToothIcon className={style.btn} />
        </Link>
      </div>
    </header>
  );
});
