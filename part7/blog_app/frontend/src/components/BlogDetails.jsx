import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';

export const loader = async ({ params }) => {
  const blogId = params.id;
  return { blogId };
};

const useBlog = () => {
  const { blogId } = useLoaderData();
  const blogs = useSelector((state) => state.blogs);
  return blogs.find((e) => e.id === blogId);
};

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useBlog();
  if (!blog) return;

  const showDeleteConfirmationDialog = () => {
    const shouldDelete = window.confirm(`delete "${blog.title}"?`);
    if (shouldDelete) dispatch(deleteBlog(blog.id));
    navigate('/');
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <p>added by {blog.author}</p>
      <button onClick={showDeleteConfirmationDialog}>delete</button>
    </div>
  );
};

export default BlogDetails;
