import EventDetailsPage from '@/features/events/details/event-details-page';
import EventsDashboard from '@/features/events/dashboard/events-dashboard';
import RegisterPage from '@/features/auth/register/register-page';
import EventForm from '@/features/events/form/envent-form';
import LoginPage from '@/features/auth/login/login-page';
import { createBrowserRouter } from 'react-router-dom';
import App from '@/app/app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <EventsDashboard /> },
      { path: 'auth/login', element: <LoginPage /> },
      { path: 'auth/register', element: <RegisterPage /> },
      { path: '/events/manage/:id', element: <EventForm key='manage' /> },
      { path: '/events/new', element: <EventForm key='create' /> },
      { path: '/events/:id', element: <EventDetailsPage /> },
    ],
  },
]);
