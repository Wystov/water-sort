import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';

import { Header } from '@/components/Header';

import 'react-toastify/dist/ReactToastify.css';

export const Layout = observer(function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        closeOnClick
        theme="colored"
        transition={Flip}
      />
    </>
  );
});
