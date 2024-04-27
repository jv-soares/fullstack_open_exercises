import { render, screen } from '@testing-library/react';
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
