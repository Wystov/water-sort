import { observer } from 'mobx-react-lite';

import { ButtonProps } from '@/types';

import styles from './Button.module.scss';

export const Button = observer(function Button({
  children,
  onClick,
  disabled,
  type,
}: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});
