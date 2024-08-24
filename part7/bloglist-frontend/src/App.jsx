import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { blogsSet, createBlog, getBlogs } from './reducers/blogReducer';
import {
  clearNotification,
  setNotification,
} from './reducers/notificationReducer';
import authService from './services/auth';
import blogService from './services/blogs';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);

  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    const userData = window.localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');

      blogService.setToken(user.token);
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      showNotification(error.response.data.error, true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const create = async (blog) => {
    const createdBlog = await dispatch(createBlog(blog));
    showNotification(
      `blog ${createdBlog.title} added by ${createdBlog.author}`,
    );
  };

  const deleteBlog = async (blogId) => {
    const didDelete = await blogService.remove(blogId);
    if (didDelete) {
      const newBlogs = blogs.filter((e) => e.id !== blogId);
      dispatch(blogsSet(newBlogs));
    }
  };

  const increaseLikes = async (blog) => {
    const newBlog = { id: blog.id, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(newBlog);
    const newBlogs = blogs.map((e) => (e.id === blog.id ? updatedBlog : e));
    dispatch(blogsSet(newBlogs));
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

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}></Notification>
      <div>
        logged in as {user.username}
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='create blog'>
        <BlogForm createBlog={create}></BlogForm>
      </Togglable>
      <div className='blog-list'>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={increaseLikes}
            handleDelete={deleteBlog}
            canDelete={user.id === blog.user.id}
          />
        ))}
      </div>
    </div>
  );

  return user === null ? loginForm() : blogList();
};

export default App;
