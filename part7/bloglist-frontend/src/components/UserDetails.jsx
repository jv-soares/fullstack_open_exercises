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
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
};

export default UserDetails;
