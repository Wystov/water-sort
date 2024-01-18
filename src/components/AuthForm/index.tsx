import { observer } from 'mobx-react-lite';

import { signInWithGoogle, signOutUser } from '@/firebase';
import { user } from '@/store/User';

export const AuthForm = observer(function AuthForm() {
  const { profile } = user;

  return (
    <div>
      {profile ? (
        <button onClick={signOutUser}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
});
