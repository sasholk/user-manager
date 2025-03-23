import { isFulfilled, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { showToast } from './slice';

export const toastMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    next(action);
    return next(
      showToast({
        message:
          'data' in action.error
            ? (action.error.data as { message: string }).message
            : (action.error.message ?? 'An error occurred'),
        severity: 'error',
      }),
    );
  }

  if (isFulfilled(action)) {
    const { endpointName } = action.meta?.arg as { endpointName: string };

    switch (endpointName) {
      case 'addUser':
        next(
          showToast({
            message: 'User created successfully',
            severity: 'success',
          }),
        );
        break;
      case 'updateUser':
        next(
          showToast({
            message: 'User updated successfully',
            severity: 'success',
          }),
        );
        break;
      case 'deleteUser':
        next(
          showToast({
            message: 'User deleted successfully',
            severity: 'success',
          }),
        );
        break;
    }
  }

  return next(action);
};
