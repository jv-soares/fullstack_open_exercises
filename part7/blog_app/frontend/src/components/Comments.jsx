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
    <div>
      <h3>Comments</h3>
      <form onSubmit={submitComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type='submit'>post comment</button>
      </form>
      {comments &&
        comments.map((comment) => <li key={comment.id}>{comment.content}</li>)}
    </div>
  );
};

export default Comments;
