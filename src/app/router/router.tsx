import EventsDashboard from '@/features/events/dashboard/events-dashboard';
import RegisterPage from '@/features/auth/register/register-page';
import LoginPage from '@/features/auth/login/login-page';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/app/app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <EventsDashboard />,
      },
      {
        path: 'auth/login',
        element: <LoginPage />,
      },
      {
        path: 'auth/register',
        element: <RegisterPage />,
      },
    ],
  },
]);
