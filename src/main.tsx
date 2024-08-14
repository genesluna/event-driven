import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/router.tsx';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './styles/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
