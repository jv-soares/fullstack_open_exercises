import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
      <Paper
        sx={{
          p: 4,
          mb: 2,
          ':hover': { backgroundColor: 'grey.50' },
        }}
      >
        <Typography variant='h6' component='h2'>
          {blog.title}
        </Typography>
        <Typography variant='body1'>by {blog.author}</Typography>
      </Paper>
    </Link>
  );
};

export default Blog;
