import { Box, Button, Icon, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';

const Comments = () => {
  const blogId = useParams().id;

  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState('');

  useEffect(() => {
    blogService.getComments(blogId).then(setComments);
  }, [blogId]);

  const submitComment = async (event) => {
    event.preventDefault();
    setComment('');
    const postedComment = await blogService.postComment(blogId, comment);
    const newComments = comments.concat(postedComment);
    setComments(newComments);
  };

  return (
    <Stack spacing={2}>
      <Typography variant='h5' component='h3'>
        Comments
      </Typography>
      <form onSubmit={submitComment}>
        <Box display='flex'>
          <TextField
            value={comment}
            size='small'
            onChange={({ target }) => setComment(target.value)}
            sx={{ mr: 2 }}
          ></TextField>
          <Button type='submit' variant='outlined'>
            <Icon sx={{ mr: 1 }}>send</Icon>
            Post
          </Button>
        </Box>
      </form>
      {comments &&
        comments.map((comment) => <li key={comment.id}>{comment.content}</li>)}
    </Stack>
  );
};

export default Comments;
