import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { AuthForm } from '@/components/AuthForm';
import { loadUserData, saveUserData } from '@/services/firebase/store';
import { user } from '@/store/User';

export const Account = observer(function Account() {
  const { profile } = user;

  return (
    <div>
      <h1>Account</h1>
      <div>{profile?.displayName ?? 'Not signed in'}</div>
      <button onClick={saveUserData}>Save</button>
      <button onClick={loadUserData}>Load</button>
      <AuthForm />
      <Link to="/">Back</Link>
    </div>
  );
});
