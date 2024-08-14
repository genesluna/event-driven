import EventsDashboard from '@/features/events/dashboard/events-dashboard';
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
    ],
  },
]);
