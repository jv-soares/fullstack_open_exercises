import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import {
  createBlog,
  deleteBlog,
  getBlogs,
  likeBlog,
} from './reducers/blogReducer';
import {
  clearNotification,
  setNotification,
} from './reducers/notificationReducer';
import { initializeUser, signIn, signOut } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
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

  const create = async (blog) => {
    const createdBlog = await dispatch(createBlog(blog));
    showNotification(
      `blog ${createdBlog.title} added by ${createdBlog.author}`,
    );
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
        <button onClick={() => dispatch(signOut())}>logout</button>
      </div>
      <Togglable buttonLabel='create blog'>
        <BlogForm createBlog={create}></BlogForm>
      </Togglable>
      <div className='blog-list'>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => dispatch(likeBlog(blog))}
            handleDelete={() => dispatch(deleteBlog(blog.id))}
            canDelete={user.id === blog.user.id}
          />
        ))}
      </div>
    </div>
  );

  return user === null ? loginForm() : blogList();
};

export default App;
