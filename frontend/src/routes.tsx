import { Suspense, lazy} from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

const Home = lazy(() => import('./components/home/home'));
const Login = lazy(() => import('./components/login/login'));

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

const App_Routes = () => {

  return (
    <RouterProvider router={router} />
  );
};

export default App_Routes;
