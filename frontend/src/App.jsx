import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'

import Home from './pages/Home';
import AdminLayout from './components/AdminLayout';
import AuthForm, { action as authAction } from './components/AuthForm';
import UsersPage, {loader as usersLoader} from './components/user/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
            path: 'allUsers',
            element: <UsersPage/>,
            loader: usersLoader,
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
