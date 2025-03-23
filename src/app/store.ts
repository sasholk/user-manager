import { userApi } from '@/entities/user';
import { toastMiddleware } from '@/widgets/toast/model/middleware';
import toastReducer from '@/widgets/toast/model/slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, toastMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
