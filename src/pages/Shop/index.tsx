import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

import { Button } from '@/components/UI/Button';
import { CartCard } from '@/components/UI/CartCard.tsx';
import { LinkOK } from '@/components/UI/LinkOK';
import { PERK_DESCRIPTION } from '@/constants';
import { user } from '@/store/User';

import styles from './Shop.module.scss';

export const Shop = observer(function Shop() {
  const { perks, coins } = user;

  const handleBuy = (perk: keyof typeof PERK_DESCRIPTION) => {
    const { cost } = PERK_DESCRIPTION[perk];
    if (coins < cost) return;
    user.decreaseCoins(cost);
    user.addPerk(perk);
    toast.success(`+1 ${PERK_DESCRIPTION[perk].title}!`);
  };

  return (
    <main className={styles.container}>
      <h2 className={styles.header}>Shop</h2>
      <div className={styles.innerContainer}>
        {Object.entries(PERK_DESCRIPTION).map(
          ([perk, { title, getIcon, cost }]) => {
            const perkKey = perk as keyof typeof perks;
            const userHasCount = perks[perkKey];

            return (
              <Button
                key={perk}
                onClick={() => handleBuy(perkKey)}
                disabled={coins < cost}
              >
                <CartCard
                  icon={getIcon()}
                  title={title}
                  userHasCount={userHasCount}
                  cost={cost}
                />
              </Button>
            );
          }
        )}
      </div>
      <LinkOK />
    </main>
  );
});
