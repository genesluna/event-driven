import EventDetailsPage from '@/features/events/details/event-details-page';
import EventsDashboard from '@/features/events/dashboard/events-dashboard';
import RegisterPage from '@/features/auth/register/register-page';
import EventForm from '@/features/events/form/envent-form';
import ProfilePage from '@/features/profiles/profile-page';
import LoginPage from '@/features/auth/login/login-page';
import PageNotFound from '@/components/page-not-found';
import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from './require-auth';
import App from '@/app/app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: '/events/manage/:id', element: <EventForm key='manage' /> },
          { path: '/profile/:id', element: <ProfilePage /> },
          { path: '/events/new', element: <EventForm key='create' /> },
        ],
      },
      { path: '', element: <EventsDashboard /> },
      { path: 'auth/login', element: <LoginPage /> },
      { path: 'auth/register', element: <RegisterPage /> },
      { path: '/events/:id', element: <EventDetailsPage /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
]);
