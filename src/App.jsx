import FirstPage from './pages/FirstPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SecondPage from './pages/SecondPage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FirstPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/start',
    element: <SecondPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
