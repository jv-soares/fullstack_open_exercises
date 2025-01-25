import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { LOGIN } from '../mutations';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      props.onLogin(token);
      localStorage.setItem('user-token', token);
      setUsername('');
      setPassword('');
    },
  });

  if (!props.show) {
    return null;
  }

  const submitForm = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submitForm}>
        <div>
          <label>username: </label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>password: </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" disabled={result.loading}>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
