import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { RouteObject } from 'react-router-dom';

const Home = React.lazy(() => import('@/pages/home/HomePage'));
const Users = React.lazy(() => import('@/pages/user/UsersPage'));
const CreateUser = React.lazy(() => import('@/pages/user/CreateUserPage'));
const EditUser = React.lazy(() => import('@/pages/user/EditUserPage'));

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
