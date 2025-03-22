import Header from '@/widgets/header';
import Toast from '@/widgets/toast/ui/Toast';
import { Container } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MainLoader from './MainLoader';

export function MainLayout() {
  return (
    <>
      <Header />

      <Container sx={{ mt: 4 }}>
        <Suspense fallback={<MainLoader />}>
          <Outlet />
        </Suspense>
      </Container>

      <Toast />
    </>
  );
}
