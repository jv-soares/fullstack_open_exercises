import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import Notification from './components/Notification';
import { getBlogs } from './reducers/blogReducer';
import { showNotification } from './reducers/notificationReducer';
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
      const notification = {
        message: error.response.data.error,
        isError: true,
      };
      dispatch(showNotification(notification));
    }
  };

  const loginForm = () => (
    <Container maxWidth='xs' sx={{ height: '100vh' }}>
      <Stack
        spacing={2}
        sx={{
          textAlign: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography variant='h4' component='h1'>
          Welcome!
        </Typography>
        <TextField
          label='Username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          data-testid='username'
        ></TextField>
        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          data-testid='password'
        ></TextField>
        <Button
          variant='contained'
          disableElevation
          size='large'
          onClick={handleLogin}
        >
          Login
        </Button>
        <Notification notification={notification}></Notification>
      </Stack>
    </Container>
  );

  const home = () => (
    <Container maxWidth='md' sx={{ height: '100vh' }}>
      <AppBar
        color='transparent'
        position='static'
        sx={{ boxShadow: 0, py: 4 }}
      >
        <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant='h5' component='h1'>
              Blog app
            </Typography>
            <Box sx={{ px: 4 }}>
              <Link to='/'>
                <Button variant='text'>Blogs</Button>
              </Link>
              <Link to='/users'>
                <Button>Users</Button>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Logged in as {user.username}</Typography>
            <Box px={1} />
            <Button variant='outlined' onClick={() => dispatch(signOut())}>
              Logout
            </Button>
          </Box>
        </Stack>
      </AppBar>
      <Notification notification={notification}></Notification>
      <Outlet></Outlet>
    </Container>
  );

  return <CssBaseline>{user === null ? loginForm() : home()}</CssBaseline>;
};

export default App;
