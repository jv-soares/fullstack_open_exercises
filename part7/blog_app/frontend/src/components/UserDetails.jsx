import { Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import userService from '../services/user';

export const loader = async ({ params }) => {
  const userId = params.id;
  const users = await userService.getUsers();
  const user = users.find((e) => e.id === userId);
  return { user };
};

const UserDetails = () => {
  const { user } = useLoaderData();

  return (
    <div>
      <Stack spacing={2} mb={6}>
        <Typography variant='h3' component='h2' sx={{ mr: 4 }}>
          {user.name}
        </Typography>
        <Typography variant='h5' component='h3'>
          Added blogs
        </Typography>
        <div>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </div>
      </Stack>
    </div>
  );
};

export default UserDetails;
