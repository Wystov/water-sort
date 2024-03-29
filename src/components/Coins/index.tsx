import { animate, m, useMotionValue, useTransform } from 'framer-motion';
import { observer } from 'mobx-react-lite';

import { BanknotesIcon } from '@heroicons/react/24/outline';

import { user } from '@/store/User';

export const Coins = observer(function Coins() {
  const { coins } = user;

  const counter = useMotionValue(coins);
  const displayedCounter = useTransform(counter, (latest) =>
    Math.round(latest)
  );

  animate(counter, coins);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <BanknotesIcon style={{ height: '24' }} />
      <m.div>{displayedCounter}</m.div>
    </div>
  );
});
