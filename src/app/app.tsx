import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider>
      <Outlet />
      <ScrollRestoration />
    </ThemeProvider>
  );
}

export default App;
