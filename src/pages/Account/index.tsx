import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { AuthForm } from '@/components/AuthForm';
import { user } from '@/store/User';

export const Account = observer(function Account() {
  const { profile } = user;
  return (
    <div>
      <h1>Account</h1>
      <div>{profile?.displayName ?? 'Not signed in'}</div>
      <AuthForm />
      <Link to="/">Back</Link>
    </div>
  );
});
