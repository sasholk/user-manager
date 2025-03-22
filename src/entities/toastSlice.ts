import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  open: boolean;
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
}

const initialState: ToastState = {
  open: false,
  message: '',
  severity: 'info',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: ToastState['severity'];
      }>,
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'info';
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
