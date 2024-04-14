import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, handleLike }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => setIsDetailsVisible(!isDetailsVisible);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetailsVisibility}>
        {isDetailsVisible ? 'hide' : 'view'}
      </button>
      {isDetailsVisible && (
        <ul>
          <li>{blog.url}</li>
          <li>
            {blog.likes} likes
            <button onClick={() => handleLike(blog)}>like</button>
          </li>
          <li>{blog.user.name}</li>
        </ul>
      )}
    </div>
  );
};

export default Blog;
