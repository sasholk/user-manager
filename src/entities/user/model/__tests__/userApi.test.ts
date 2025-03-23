import { configureStore } from '@reduxjs/toolkit';
import { User } from '../types';
import { userApi } from '../userApi';

describe('userApi', () => {
  let store: ReturnType<typeof createTestStore>;

  const createTestStore = () =>
    configureStore({
      reducer: {
        [userApi.reducerPath]: userApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
    });

  beforeEach(() => {
    store = createTestStore();
  });

  it('should start with empty user list', () => {
    const result = userApi.endpoints.getUsers.select()(store.getState());
    expect(result.data).toBeUndefined();
  });

  it('should optimistically add user to cache', async () => {
    const newUser: Partial<User> = {
      name: 'Test User',
      email: 'test@example.com',
    };

    await store.dispatch(userApi.endpoints.getUsers.initiate());

    store.dispatch(
      userApi.util.updateQueryData('getUsers', undefined, (draft) => {
        draft.push({ id: 1, name: 'Oleksandr', email: 'test@a.com' });
      }),
    );

    await store.dispatch(userApi.endpoints.addUser.initiate(newUser));

    const result = userApi.endpoints.getUsers.select()(store.getState());

    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Test User',
          email: 'test@example.com',
        }),
      ]),
    );
  });

  it('should optimistically delete user from cache', async () => {
    store.dispatch(
      userApi.util.updateQueryData('getUsers', undefined, (draft) => {
        draft.push({ id: 123, name: 'ToDelete', email: 'delete@me.com' });
      }),
    );

    await store.dispatch(userApi.endpoints.deleteUser.initiate(123));

    const result = userApi.endpoints.getUsers.select()(store.getState());
    expect(result.data?.find((u) => u.id === 123)).toBeUndefined();
  });
});
