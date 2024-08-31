import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <Link to={`/blogs/${blog.id}`}>
      <div style={blogStyle}>
        {blog.title} {blog.author}
      </div>
    </Link>
  );
};

export default Blog;
