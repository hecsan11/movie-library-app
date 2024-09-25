import { Suspense, lazy} from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

const Login = lazy(() => import('./components/login/login'));
const Home = lazy(() => import('./components/home/home'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    )
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    )
  }
]);

const AppRoutes = () => {

  return (
    <RouterProvider router={router} />
  );
};

export default AppRoutes;
