import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';

const Comments = () => {
  const blogId = useParams().id;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    blogService.getComments(blogId).then(setComments);
  }, [blogId]);

  return (
    <div>
      <h3>Comments</h3>
      {comments &&
        comments.map((comment) => <li key={comment.id}>{comment.content}</li>)}
    </div>
  );
};

export default Comments;
