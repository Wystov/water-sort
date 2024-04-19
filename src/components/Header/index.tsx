import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import { Coins } from '@/components/Coins';
import { user } from '@/store/User';

import styles from './Header.module.scss';

export const Header = observer(function Header() {
  const { profile } = user;

  return (
    <header className={styles.header}>
      <Coins />
      <div className={styles.linksContainer}>
        <Link to="/account" title="Account">
          {profile ? (
            <UserCircleIcon className={styles.btn} />
          ) : (
            <ArrowLeftEndOnRectangleIcon className={styles.btn} />
          )}
        </Link>
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
