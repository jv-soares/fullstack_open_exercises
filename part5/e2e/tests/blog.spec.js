const { test, expect, beforeEach, describe } = require('@playwright/test');
const helper = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: { username: 'testuser', name: 'Test User', password: 'test123' },
    });
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
  });
});
