import { Link, useLoaderData } from 'react-router-dom';
import userService from '../services/user';

export const loader = async () => {
  const users = await userService.getUsers();
  return { users };
};

const UserList = () => {
  const { users } = useLoaderData();

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
