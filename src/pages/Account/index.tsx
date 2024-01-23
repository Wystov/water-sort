import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthForm } from '@/components/AuthForm';
import { loadFromCloud, saveToCloud } from '@/services/firebase/store';
import { user } from '@/store/User';

const handleSave = () =>
  toast.promise(saveToCloud, {
    pending: 'Saving...',
    success: 'Saved',
    error: 'Failed to save',
  });

const handleLoad = () =>
  toast.promise(loadFromCloud, {
    pending: 'Loading...',
    success: 'Loaded',
    error: 'Failed to load',
  });

export const Account = observer(function Account() {
  const { profile } = user;

  return (
    <div>
      <h1>Account</h1>
      <div>{profile?.displayName ?? 'Not signed in'}</div>
      {profile && (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleLoad}>Load</button>
        </>
      )}
      <AuthForm />
      <Link to="/">Back</Link>
    </div>
  );
});
