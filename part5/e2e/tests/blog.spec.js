const { test, expect, beforeEach, describe } = require('@playwright/test');

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
      await page.getByTestId('username').fill(username);
      await page.getByTestId('password').fill('test123');
      await page.getByRole('button', { name: 'login' }).click();
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
});
