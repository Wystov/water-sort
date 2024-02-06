import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { DocumentCheckIcon } from '@heroicons/react/24/outline';

import { AuthForm } from '@/components/AuthForm';
import { loadFromCloud, saveToCloud } from '@/services/firebase/store';
import { game } from '@/store/Game';
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
  const { profile, wins } = user;

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
      <p>Stats:</p>
      <div>
        <DocumentCheckIcon style={{ height: '24' }} />
        {wins}
      </div>
      <button onClick={() => game.reset()}>Reset progress</button>
      <Link to="/">Back</Link>
    </div>
  );
});
