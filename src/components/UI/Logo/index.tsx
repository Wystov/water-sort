import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './Logo.module.scss';

export const Logo = observer(function Logo() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')} className={styles.container}>
      <img src="/logo.png" />
      <div className={styles.title}>Water Sort</div>
    </div>
  );
});
