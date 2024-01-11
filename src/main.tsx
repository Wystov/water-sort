import { StrictMode } from 'react';
import { domAnimation, LazyMotion } from 'framer-motion';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import './style.scss';

ReactDOM.createRoot(document.querySelector('.app')!).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <RouterProvider router={router} />
    </LazyMotion>
  </StrictMode>
);
