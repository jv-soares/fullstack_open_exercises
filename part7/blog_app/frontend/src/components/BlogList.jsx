import { Box, Button, Icon } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogReducer';
import AddBlogDialog from './AddBlogDialog';
import Blog from './Blog';

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Box className='blog-list' display='flex' flexDirection='column'>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => dispatch(likeBlog(blog))}
          handleDelete={() => dispatch(deleteBlog(blog.id))}
          canDelete={user.id === blog.user.id}
        />
      ))}
      <Button
        variant='contained'
        size='large'
        onClick={openDialog}
        sx={{ alignSelf: 'center' }}
      >
        <Icon>add</Icon>
        Add blog
      </Button>
      <AddBlogDialog isOpen={isDialogOpen} handleClose={closeDialog} />
    </Box>
  );
};

export default BlogList;
