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
      {profile && (
        <div>
          <img src={profile.photoURL ?? ''} style={{ borderRadius: '50%' }} />
          <div>{profile.displayName ?? 'Not signed in'}</div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleLoad}>Load</button>
        </div>
      )}
      <AuthForm />
      <Link to="/">Back</Link>
    </div>
  );
});
