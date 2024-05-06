import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import {
  ArrowLeftEndOnRectangleIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

import { Coins } from '@/components/Coins';
import { user } from '@/store/User';

import { Logo } from '../UI/Logo';

import styles from './Header.module.scss';

export const Header = observer(function Header() {
  const { profile } = user;

  return (
    <header className={styles.header}>
      <Coins />
      <Logo />

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
        <Link to="help" title="Help">
          <QuestionMarkCircleIcon className={styles.btn} />
        </Link>
      </div>
    </header>
  );
});
