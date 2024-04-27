import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../../src/components/Blog';

test('should render only title and author', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    likes: 1,
    user: { name: 'test name' },
  };

  const { container } = render(<Blog blog={blog}></Blog>);

  const title = screen.getByText(blog.title, { exact: false });
  const author = screen.getByText(blog.author, { exact: false });
  const likes = container.querySelector('.blog-likes');
  const url = container.querySelector('.blog-url');

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(likes).toBeNull();
  expect(url).toBeNull();
});

test('should also render likes and url when "view" button is pressed', async () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    likes: 1,
    user: { name: 'test name' },
  };

  const { container } = render(<Blog blog={blog}></Blog>);

  const user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likes = container.querySelector('.blog-likes');
  const url = container.querySelector('.blog-url');

  expect(likes).not.toBeNull();
  expect(url).not.toBeNull();
});
