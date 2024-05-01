const { test, expect, beforeEach, describe } = require('@playwright/test');
const helper = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    const user = {
      username: 'testuser',
      name: 'Test User',
      password: 'test123',
    };
    await helper.createUser(request, user);
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in')).toBeVisible();
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const username = 'testuser';
      await helper.loginWith(page, username, 'test123');
      await expect(page.getByText(`logged in as ${username}`)).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testuser');
      await page.getByTestId('password').fill('test');
      await page.getByRole('button', { name: 'login' }).click();
      const errorLocator = page.getByText(`invalid username or password`);
      await expect(errorLocator).toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await helper.loginWith(page, 'testuser', 'test123');
    });

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://testurl.com',
      };
      await helper.createBlog(page, blog);
      const blogsLocator = page.locator('.blog-list');
      await expect(blogsLocator.getByText(blog.title)).toBeVisible();
    });

    test('a blog can be liked', async ({ page }) => {
      const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://testurl.com',
      };
      await helper.createBlog(page, blog);
      const blogLocator = page.locator('.blog-list').getByText(blog.title);
      await blogLocator.getByRole('button', { name: 'view' }).click();
      await expect(blogLocator.getByText('0 likes')).toBeVisible();
      await blogLocator.getByRole('button', { name: 'like' }).click();
      await expect(blogLocator.getByText('1 likes')).toBeVisible();
    });

    test('a blog can be deleted by its creator', async ({ page }) => {
      const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://testurl.com',
      };
      await helper.createBlog(page, blog);
      const blogLocator = page.locator('.blog-list').getByText(blog.title);
      await blogLocator.getByRole('button', { name: 'view' }).click();
      page.on('dialog', (dialog) => dialog.accept());
      await blogLocator.getByRole('button', { name: 'delete' }).click();
      await expect(blogLocator).toBeHidden();
    });

    test('a blogs delete button is only visible to its creator', async ({
      page,
      request,
    }) => {
      const newUser = {
        username: 'testuser2',
        name: 'Test User 2',
        password: 'test123',
      };
      await helper.createUser(request, newUser);

      const blog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://testurl.com',
      };
      await helper.createBlog(page, blog);
      await page.getByRole('button', { name: 'logout' }).click();
      await helper.loginWith(page, 'testuser2', 'test123');
      const blogLocator = page.locator('.blog-list').getByText(blog.title);
      await blogLocator.getByRole('button', { name: 'view' }).click();
      const deleteButtonLocator = blogLocator.getByRole('button', {
        name: 'delete',
      });
      await expect(deleteButtonLocator).toBeHidden();
    });
  });
});
