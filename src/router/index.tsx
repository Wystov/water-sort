import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Game } from '@/pages/Game';
import { Settings } from '@/pages/Settings';
import { Shop } from '@/pages/Shop';

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
