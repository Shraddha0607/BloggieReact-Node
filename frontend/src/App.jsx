import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'

import Home from './pages/Home';
import AdminLayout from './components/AdminLayout';
import AuthForm, { action as authAction } from './components/AuthForm';
import UsersPage, {loader as usersLoader, action as deleteUserAction} from './components/user/Users';
import { loader as tokenLoader } from './util/auth';

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
            element: <UsersPage/>,
            loader: usersLoader,
            children: [
              {
                path: ':userId',
                action: deleteUserAction,
              },
            ]
          },
        ]
      },
      {
        path: 'auth',
        element: <AuthForm/>,
        action: authAction,
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
