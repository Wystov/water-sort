import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';

import { Header } from '@/components/Header';
import { user } from '@/store/User';

import { Loader } from '../UI/Loader';

import 'react-toastify/dist/ReactToastify.css';

export const Layout = observer(function Layout() {
  return (
    <>
      <Header />
      {user.loaded ? <Outlet /> : <Loader />}
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
