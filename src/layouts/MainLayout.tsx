import { hideToast } from '@/entities/toastSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function MainLayout() {
  const { open, message, severity } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/users/new">
            Create User
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Suspense
          fallback={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
