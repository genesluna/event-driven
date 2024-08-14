import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import MainLayout from './layouts/main-layout';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Outlet />
        <ScrollRestoration />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
