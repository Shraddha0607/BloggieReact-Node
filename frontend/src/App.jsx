import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'

import Home from './pages/Home';
import AdminLayout from './components/AdminLayout';
import AuthForm, { action as authAction } from './components/AuthForm';
import UsersPage, { loadUsers as usersLoader, action as deleteUserAction } from './components/user/Users';
import { loader as tokenLoader, checkAuthLoader } from './util/auth';
import EditUserPage, { action as manipulateUserAction, loader as editUserPageLoader, } from './components/user/EditUser';
import { action as logoutAction } from './pages/Logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    loader: tokenLoader,
    id: 'root',
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'users',
            element: <UsersPage />,
            loader: usersLoader,
            id: 'users',
          },
          {
            path: 'users/:userId/edit',
            element: <EditUserPage />,
            id: 'user-details',
            loader: editUserPageLoader,
            action: manipulateUserAction,
          },
          {
            path: 'users/:userId',
            id: 'user-detail',
            loader: checkAuthLoader,
            action: deleteUserAction,
          }
        ]
      },
      {
        path: 'auth',
        element: <AuthForm />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      }
    ]
  }
])
function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
