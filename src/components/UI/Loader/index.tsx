import { observer } from 'mobx-react-lite';

import style from './style.module.scss';

export const Loader = observer(function Loader() {
  return (
    <div className={style.loader}>
      <div></div>
      <div></div>
    </div>
  );
});
