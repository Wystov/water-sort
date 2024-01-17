import { createBrowserRouter } from 'react-router-dom';

import { Game } from '@/components/Game';
import { Layout } from '@/components/Layout';
import { Settings } from '@/components/Settings';
import { Shop } from '@/components/Shop';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Game />,
        path: '/',
      },
      {
        element: <Settings />,
        path: '/settings',
      },
      {
        element: <Shop />,
        path: '/shop',
      },
    ],
  },
]);
