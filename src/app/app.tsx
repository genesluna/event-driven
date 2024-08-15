import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { logout, signIn } from '@/features/auth/auth-slice';
import { onAuthStateChanged } from 'firebase/auth';
import MainLayout from './layouts/main-layout';
import { useAppDispatch } from './store/store';
import { auth } from './config/firebase';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: (user) => {
        if (user) {
          dispatch(signIn(user));
        } else {
          dispatch(logout());
        }
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }, [dispatch]);

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
