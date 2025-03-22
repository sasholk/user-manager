import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Alert, Snackbar } from '@mui/material';
import { hideToast } from '../model/slice';

const Toast = () => {
  const { open, message, severity } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
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
  );
};

export default Toast;
