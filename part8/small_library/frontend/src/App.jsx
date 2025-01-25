import { useApolloClient } from '@apollo/client';
import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';

const App = () => {
  const [page, setPage] = useState('authors');
  const [userToken, setUserToken] = useState(null);

  const client = useApolloClient();

  const onLogin = (userToken) => {
    setUserToken(userToken);
    setPage('authors');
  };

  const logout = () => {
    setUserToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {userToken && <button onClick={() => setPage('add')}>add book</button>}
        {userToken && (
          <button onClick={() => setPage('recommendations')}>
            recommendations
          </button>
        )}
        {userToken && <button onClick={logout}>logout</button>}
        {!userToken && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} canEdit={userToken} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} />

      <LoginForm show={page === 'login'} onLogin={onLogin}></LoginForm>
    </div>
  );
};

export default App;
