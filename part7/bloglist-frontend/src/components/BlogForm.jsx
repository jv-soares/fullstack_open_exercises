import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h3>add blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            data-testid='blog-title'
          />
        </div>
        <div>
          author
          <input
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            data-testid='blog-author'
          />
        </div>
        <div>
          url
          <input
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            data-testid='blog-url'
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = { createBlog: PropTypes.func.isRequired };

export default BlogForm;
