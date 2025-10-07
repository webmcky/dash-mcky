import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/auth1/login');
  await page.fill('input[name="email"]', 'anugrah@example.com');
  await page.fill('input[name="password"]', 'Joker12@');
  await page.click('button[type="submit"]');
  await expect(page.getByText('Welcome')).toBeVisible();
});
