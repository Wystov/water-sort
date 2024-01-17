import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { Cog6ToothIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import { Stats } from '@/components/Stats';

import style from './style.module.scss';

export const Header = observer(function Header() {
  return (
    <header className={style.header}>
      <Stats />
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
