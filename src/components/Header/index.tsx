import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import {
  Cog6ToothIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import { Stats } from '@/components/Stats';

import styles from './Header.module.scss';

export const Header = observer(function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.linksContainer}>
        <Link to="/account" title="Account">
          <UserCircleIcon className={styles.btn} />
        </Link>
        <Stats />
      </div>
      <div className={styles.linksContainer}>
        <Link to="/shop" title="Shop">
          <ShoppingCartIcon className={styles.btn} />
        </Link>
        <Link to="/settings" title="Settings">
          <Cog6ToothIcon className={styles.btn} />
        </Link>
      </div>
    </header>
  );
});
