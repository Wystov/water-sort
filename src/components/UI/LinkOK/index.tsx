import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import styles from './LinkOK.module.scss';

export const LinkOK = observer(function LinkOK() {
  return (
    <Link to="/" className={styles.linkOk}>
      ✓
    </Link>
  );
});
