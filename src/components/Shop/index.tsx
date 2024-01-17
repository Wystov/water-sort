import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { PERK_COST } from '@/constants';
import { user } from '@/store/User';

export const Shop = observer(function Shop() {
  const { perks, coins } = user;

  const handleBuy = (perk: keyof typeof PERK_COST) => {
    if (coins < PERK_COST[perk]) return;
    user.decreaseCoins(PERK_COST[perk]);
    user.addPerk(perk);
  };

  return (
    <main>
      <h1>Shop</h1>
      <ul>
        {Object.entries(perks).map(([perkName, value]) => {
          const perk = perkName as keyof typeof perks;
          return (
            <li key={perk}>
              {perk}: {value}
              <button
                onClick={() => handleBuy(perk)}
                disabled={coins < PERK_COST[perk]}
              >
                Buy for {PERK_COST[perk]}
              </button>
            </li>
          );
        })}
      </ul>
      <Link to="/">Back</Link>
    </main>
  );
});
