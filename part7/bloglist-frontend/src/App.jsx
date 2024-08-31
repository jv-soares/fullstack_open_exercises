import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import Notification from './components/Notification';
import { getBlogs } from './reducers/blogReducer';
import {
  clearNotification,
  setNotification,
} from './reducers/notificationReducer';
import { initializeUser, signIn, signOut } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(getBlogs());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setUsername('');
      setPassword('');
      await dispatch(signIn(username, password));
    } catch (error) {
      showNotification(error.response.data.error, true);
    }
  };

  const showNotification = (message, isError = false) => {
    dispatch(setNotification({ message, isError }));
    setTimeout(() => dispatch(clearNotification()), 3000);
  };

  const loginForm = () => (
    <div>
      <h2>log in</h2>
      <Notification notification={notification}></Notification>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            data-testid='username'
          />
        </div>
        <div>
          password
          <input
            type='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            data-testid='password'
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );

  const home = () => (
    <div>
      <div>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
        logged in as {user.username}
        <button onClick={() => dispatch(signOut())}>logout</button>
      </div>
      <h2>blog app</h2>
      <Notification notification={notification}></Notification>
      <div></div>
      <Outlet></Outlet>
    </div>
  );

  return user === null ? loginForm() : home();
};

export default App;
