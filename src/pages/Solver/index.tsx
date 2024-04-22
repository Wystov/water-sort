import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router-dom';

export const Solver = observer(function Solver() {
  const { state } = useLocation();
  if (!state?.access) return <Navigate to="/" />;

  return <div>Solver</div>;
});
