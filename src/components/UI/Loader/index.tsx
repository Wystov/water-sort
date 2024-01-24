import { observer } from 'mobx-react-lite';

import styles from './Loader.module.scss';

export const Loader = observer(function Loader() {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
    </div>
  );
});
