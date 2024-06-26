import { lazy, Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Loader } from '@/components/UI/Loader';
import { Account } from '@/pages/Account';
import { Game } from '@/pages/Game';
import { Help } from '@/pages/Help';
import { Shop } from '@/pages/Shop';

const LazySolverPage = observer(function SolverPage() {
  const Solver = lazy(() =>
    import('@/pages/Solver').then((module) => ({ default: module.Solver }))
  );

  return (
    <Suspense fallback={<Loader />}>
      <Solver />
    </Suspense>
  );
});

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Game />,
        path: '/',
      },
      {
        element: <Shop />,
        path: '/shop',
      },
      {
        element: <Account />,
        path: '/account',
      },
      {
        element: <LazySolverPage />,
        path: '/solver',
      },
      { element: <Help />, path: '/help' },
    ],
  },
]);
