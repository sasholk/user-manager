type ToastSeverity = 'success' | 'info' | 'warning' | 'error';

export interface ToastState {
  open: boolean;
  message: string;
  severity: ToastSeverity;
}
