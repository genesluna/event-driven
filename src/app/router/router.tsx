import { createBrowserRouter } from 'react-router-dom';
import EventsDashboard from '@/components/events-dashboard';
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
