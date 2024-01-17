import { observer } from 'mobx-react-lite';

import { BanknotesIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

import { user } from '@/store/User';

export const Stats = observer(function Stats() {
  const { coins, wins } = user;
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <BanknotesIcon style={{ height: '24' }} />
      {coins}
      <DocumentCheckIcon style={{ height: '24' }} />
      {wins}
    </div>
  );
});
