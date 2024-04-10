import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import authService from './services/auth';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = await authService.login({ username, password });
    setUser(user);
    setUsername('');
    setPassword('');
  };

  const loginForm = () => (
    <div>
      <h2>log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>logged in as {user.username}</p>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog key={blog.id} blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );

  return user === null ? loginForm() : blogList();
};

export default App;
