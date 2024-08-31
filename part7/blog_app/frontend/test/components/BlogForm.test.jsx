import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../../src/components/BlogForm';

test('should call createBlog handler with submitted values', async () => {
  const mockCreateBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={mockCreateBlog}></BlogForm>);

  const titleTextField = screen.getByText('title').querySelector('input');
  const authorTextField = screen.getByText('author').querySelector('input');
  const urlTextField = screen.getByText('url').querySelector('input');

  await user.type(titleTextField, 'Testing');
  await user.type(authorTextField, 'Test Author');
  await user.type(urlTextField, 'https://test.com');

  const submitButton = screen.getByText('submit');
  await user.click(submitButton);

  expect(mockCreateBlog.mock.calls[0][0]).toEqual({
    title: 'Testing',
    author: 'Test Author',
    url: 'https://test.com',
  });
});
