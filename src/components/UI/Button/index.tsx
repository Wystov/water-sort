import { observer } from 'mobx-react-lite';

import { ButtonProps } from '@/types';

import styles from './Button.module.scss';

export const Button = observer(function Button({
  children,
  onClick,
}: ButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
});
