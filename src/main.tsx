import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';

import './style.scss';

ReactDOM.createRoot(document.querySelector('.app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
