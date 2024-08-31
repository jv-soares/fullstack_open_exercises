import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../../src/components/Blog';

const blog = {
  title: 'test blog',
  author: 'test author',
  likes: 1,
  user: { name: 'test name' },
};

test('should render only title and author', () => {
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
  const { container } = render(<Blog blog={blog}></Blog>);

  const user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likes = container.querySelector('.blog-likes');
  const url = container.querySelector('.blog-url');

  expect(likes).not.toBeNull();
  expect(url).not.toBeNull();
});

test('should call handleLike callback when like button is pressed', async () => {
  const user = userEvent.setup();
  const mockHandleLike = vi.fn();

  const { container } = render(
    <Blog blog={blog} handleLike={mockHandleLike}></Blog>,
  );

  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likeButton = container
    .querySelector('.blog-likes')
    .querySelector('button');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandleLike).toHaveBeenCalledTimes(2);
});
