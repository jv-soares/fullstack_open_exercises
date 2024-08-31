import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import BlogDetails, {
  loader as blogDetailsLoader,
} from './components/BlogDetails';
import BlogList from './components/BlogList';
import UserDetails, {
  loader as userDetailsLoader,
} from './components/UserDetails';
import UserList, { loader as usersLoader } from './components/UserList';
import './index.css';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      { path: '/', element: <BlogList /> },
      { path: 'users', element: <UserList />, loader: usersLoader },
      {
        path: 'users/:id',
        element: <UserDetails />,
        loader: userDetailsLoader,
      },
      { path: 'blogs', element: <BlogList /> },
      {
        path: 'blogs/:id',
        element: <BlogDetails />,
        loader: blogDetailsLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
