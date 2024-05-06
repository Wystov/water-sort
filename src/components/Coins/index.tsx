import { animate, m, useMotionValue, useTransform } from 'framer-motion';
import { observer } from 'mobx-react-lite';

import { BanknotesIcon } from '@heroicons/react/24/outline';

import { useRouteProtection } from '@/hooks/useRouteProtection';
import { user } from '@/store/User';

import styles from './Coins.module.scss';

export const Coins = observer(function Coins() {
  const { coins } = user;

  const counter = useMotionValue(coins);
  const displayedCounter = useTransform(counter, (latest) =>
    Math.round(latest)
  );

  animate(counter, coins);

  const handleProtect = useRouteProtection();

  return (
    <div className={styles.container} onClick={handleProtect}>
      <BanknotesIcon className={styles.icon} />
      <m.div className={styles.counter}>{displayedCounter}</m.div>
    </div>
  );
});
