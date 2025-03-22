import React from 'react';
import { RouteObject } from 'react-router-dom';

const Home = React.lazy(() => import('@/pages/HomePage'));
const Users = React.lazy(() => import('@/pages/UsersPage'));
const CreateUser = React.lazy(() => import('@/pages/CreateUserPage'));
const EditUser = React.lazy(() => import('@/pages/EditUserPage'));
const MainLayout = React.lazy(() => import('@/layouts/MainLayout'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'users', element: <Users /> },
      { path: 'users/new', element: <CreateUser /> },
      { path: 'users/edit/:id', element: <EditUser /> },
    ],
  },
];

export default routes;
