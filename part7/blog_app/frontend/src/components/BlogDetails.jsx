import { Box, Button, Icon, Link, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
import Comments from './Comments';

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

  const user = useSelector((state) => state.user);

  const blog = useBlog();
  if (!blog) return;

  const showDeleteConfirmationDialog = () => {
    const shouldDelete = window.confirm(`delete "${blog.title}"?`);
    if (shouldDelete) {
      dispatch(deleteBlog(blog.id));
      navigate('/');
    }
  };

  return (
    <div>
      <Stack spacing={2} mb={6}>
        <Box display='flex'>
          <Typography variant='h3' component='h2' sx={{ mr: 4 }}>
            {blog.title}
          </Typography>
          <Button
            variant='contained'
            sx={{ px: 2 }}
            onClick={() => dispatch(likeBlog(blog))}
          >
            <Icon sx={{ mr: 1 }}>thumb_up</Icon>
            {blog.likes}
          </Button>
        </Box>
        <Typography variant='subtitle1'>Added by {blog.author}</Typography>
        <Link href={blog.url}>{blog.url}</Link>
        {blog.user.id === user.id && (
          <Button
            variant='outlined'
            color='error'
            sx={{ alignSelf: 'start' }}
            onClick={showDeleteConfirmationDialog}
          >
            <Icon sx={{ mr: 1 }}>delete</Icon> Delete blog
          </Button>
        )}
      </Stack>
      <Comments />
    </div>
  );
};

export default BlogDetails;
