const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'create blog' }).click();
  await page.getByTestId('blog-title').fill(blog.title);
  await page.getByTestId('blog-author').fill(blog.author);
  await page.getByTestId('blog-url').fill(blog.url);
  await page.getByRole('button', { name: 'submit' }).click();
};

export { loginWith, createBlog };
