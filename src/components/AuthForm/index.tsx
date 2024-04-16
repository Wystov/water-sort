import { observer } from 'mobx-react-lite';

import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { Button } from '@/components/UI/Button';
import { signInWithGoogle, signOutUser } from '@/services/firebase/auth';
import { user } from '@/store/User';

export const AuthForm = observer(function AuthForm() {
  const { profile } = user;

  return (
    <>
      {profile ? (
        <Button onClick={signOutUser}>
          <ArrowLeftStartOnRectangleIcon />
          Sign out
        </Button>
      ) : (
        <Button onClick={signInWithGoogle}>
          <ArrowLeftEndOnRectangleIcon />
          Sign in with Google
        </Button>
      )}
    </>
  );
});
