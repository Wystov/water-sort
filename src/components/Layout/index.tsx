import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';

export const Layout = observer(function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
});
