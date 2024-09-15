import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { showNotification } from '../reducers/notificationReducer';

const AddBlogDialog = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const submitBlog = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const blog = Object.fromEntries(formData.entries());

    let action;
    try {
      const createdBlog = await dispatch(createBlog(blog));
      const notification = {
        message: `blog ${createdBlog.title} added by ${createdBlog.author}`,
        isError: false,
      };
      action = showNotification(notification);
    } catch (error) {
      const notification = {
        message: error.response.data.error,
        isError: true,
      };
      action = showNotification(notification);
    } finally {
      handleClose();
      dispatch(action);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ component: 'form', onSubmit: submitBlog }}
    >
      <DialogTitle>Add blog</DialogTitle>

      <DialogContent>
        <Box display='flex' flexDirection='column'>
          <TextField
            autoFocus
            required
            margin='dense'
            id='title'
            name='title'
            label='Title'
          />
          <TextField
            required
            margin='dense'
            id='author'
            name='author'
            label='Author'
          />
          <TextField required margin='dense' id='url' name='url' label='Url' />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit'>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBlogDialog;
