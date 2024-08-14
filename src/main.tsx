import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/router.tsx';
import { createRoot } from 'react-dom/client';
import { store } from './app/store/store.ts';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import './styles/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
