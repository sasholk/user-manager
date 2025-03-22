import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

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
