import { useDispatch, useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { createBlog, deleteBlog, likeBlog } from '../reducers/blogReducer';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';
import Blog from './Blog';

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

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

  return (
    <div className='blog-list'>
      <Togglable buttonLabel='create blog'>
        <BlogForm createBlog={create}></BlogForm>
      </Togglable>
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
  );
};

export default BlogList;
