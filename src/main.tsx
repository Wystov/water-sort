import { StrictMode } from 'react';
import { domAnimation, LazyMotion } from 'framer-motion';
import ReactDOM from 'react-dom/client';

import { App } from './App';

import './style.scss';

ReactDOM.createRoot(document.querySelector('.app')!).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </StrictMode>
);
