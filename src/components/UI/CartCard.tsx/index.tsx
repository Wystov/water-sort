import { observer } from 'mobx-react-lite';

import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';

import { CartCardProps } from '@/types';

import styles from './CartCard.module.scss';

export const CartCard = observer(function CartCard({
  icon,
  title,
  userHasCount,
  cost,
}: CartCardProps) {
  return (
    <>
      <div className={styles.container}>
        {icon}
        <div className={styles.innerContainer}>
          <span className={styles.title}>{title}</span>
          <span>You have {userHasCount}</span>
          <span>Price {cost}</span>
        </div>
      </div>
      <div>
        +1
        <ShoppingCartIcon className={styles.icon} />
      </div>
    </>
  );
});
