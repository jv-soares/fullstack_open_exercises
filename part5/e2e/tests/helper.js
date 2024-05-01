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
  await page.locator('.blog-list').getByText(blog.title).waitFor();
};

const createUser = async (request, user) => {
  await request.post('/api/users', {
    data: { username: user.username, name: user.name, password: user.password },
  });
};

const viewBlogDetails = async (page, blogTitle) => {
  const locator = page.locator('.blog-list').getByText(blogTitle);
  await locator.getByRole('button', { name: 'view' }).click();
  return locator;
};

const likeBlog = async (page, blogTitle, count) => {
  const locator = await viewBlogDetails(page, blogTitle);
  for (let i = 0; i < count; i++) {
    await locator.getByRole('button', { name: 'like' }).click();
    await locator.getByText(`${i + 1} likes`).waitFor();
  }
};

export { loginWith, createBlog, createUser, viewBlogDetails, likeBlog };
