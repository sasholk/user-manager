import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './types';

/**
 * API service for managing users.
 * 
 * @remarks
 * This service uses `createApi` from Redux Toolkit Query to define endpoints for fetching, adding, updating, and deleting users.
 * It also includes optimistic updates to the cached `getUsers` query data.
 * 
 * @constant
 * @type {Api}
 * 
 * @property {Function} getUsers - Fetches the list of users.
 * @property {Function} addUser - Adds a new user. Optimistically updates the cached `getUsers` result.
 * @property {Function} updateUser - Updates an existing user by ID. Optimistically updates the cached `getUsers` result.
 * @property {Function} deleteUser - Deletes a user by ID. Optimistically updates the cached `getUsers` result.
 * 
 * @example
 * // Fetch users
 * const { data: users } = useGetUsersQuery();
 * 
 * // Add a user
 * const [addUser] = useAddUserMutation();
 * addUser({ name: 'John Doe', email: 'john.doe@example.com' });
 * 
 * // Update a user
 * const [updateUser] = useUpdateUserMutation();
 * updateUser({ id: 1, user: { name: 'Jane Doe' } });
 * 
 * // Delete a user
 * const [deleteUser] = useDeleteUserMutation();
 * deleteUser(1);
 */
export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      // Optimistically update the cached getUsers result
      async onQueryStarted(newUser, { dispatch, getState, queryFulfilled }) {
        const state = getState();
        const existingUsers = userApi.endpoints.getUsers.select()(state).data;

        const maxId =
          existingUsers && existingUsers.length > 0
            ? Math.max(...existingUsers.map((u: User) => u.id))
            : 0;

        const fakeId = maxId + 1;

        const patchResult = dispatch(
          userApi.util.updateQueryData('getUsers', undefined, (draft) => {
            draft.push({ ...newUser, id: fakeId } as User);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateUser: builder.mutation<User, { id: number; user: Partial<User> }>({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: user,
      }),
      // Optimistically update the cached getUsers result
      async onQueryStarted({ id, user }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const target = draft.find((u) => u.id === id);
            if (target) Object.assign(target, user);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      // Optimistically update the cached getUsers result
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUsers', undefined, (draft) => {
            return draft.filter((u) => u.id !== id);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
