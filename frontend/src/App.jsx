import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'

import Home from './pages/Home';
import AdminLayout from './components/AdminLayout';
import Login from './components/AuthForm';

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
        path: 'Admin',
        element: <AdminLayout />
      },
      {
        path: 'Login',
        element: <Login/>
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
