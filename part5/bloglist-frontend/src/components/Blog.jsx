import { useState } from 'react';

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => setIsDetailsVisible(!isDetailsVisible);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showDeleteConfirmationDialog = () => {
    const shouldDelete = window.confirm(`delete "${blog.title}"?`);
    if (shouldDelete) handleDelete(blog.id);
  };

  const details = (
    <div>
      <ul>
        <li className="blog-url">{blog.url}</li>
        <li className="blog-likes">
          {blog.likes} likes
          <button onClick={() => handleLike(blog)}>like</button>
        </li>
        <li>{blog.user.name}</li>
      </ul>
      <button onClick={showDeleteConfirmationDialog}>delete</button>
    </div>
  );

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetailsVisibility}>
        {isDetailsVisible ? 'hide' : 'view'}
      </button>
      {isDetailsVisible && details}
    </div>
  );
};

export default Blog;
