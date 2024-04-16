import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  CloudArrowDownIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

import { AuthForm } from '@/components/AuthForm';
import { Button } from '@/components/UI/Button';
import { loadFromCloud, saveToCloud } from '@/services/firebase/store';
import { user } from '@/store/User';

import styles from './Account.module.scss';

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
    <div className={styles.container}>
      {profile?.photoURL && (
        <img src={profile.photoURL} className={styles.avatar} />
      )}
      <div className={styles.name}>{profile?.displayName ?? 'Anonymous'}</div>
      <div>Wins: {wins}</div>
      <div className={styles.btnContainer}>
        {profile && (
          <>
            <Button onClick={handleSave}>
              <CloudArrowDownIcon />
              Save
            </Button>
            <Button onClick={handleLoad}>
              <CloudArrowUpIcon />
              Load
            </Button>
          </>
        )}
      </div>
      <AuthForm />
      <Link to="/" className={styles.linkOk}>
        ✓
      </Link>
    </div>
  );
});
