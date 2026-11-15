import { test as setup, expect, type Page } from '@playwright/test';
import path from 'node:path';

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing ${name}. Add it to your .env file (see .env.example).`);
	}
	return value;
}

const email = requireEnv('SHELF_EMAIL');
const password = requireEnv('SHELF_PASSWORD');

const authenticationFile = path.resolve('playwright/.authentication/user.json');

async function login(page: Page) {
	await page.goto('/login');
	await page.fill('input[name="email"]', email);
	await page.fill('input[name="password"]', password);
	await page.getByRole('button', { name: 'Sign in' }).click();
	await expect(page).toHaveURL('/shelf');

	await page.context().storageState({ path: authenticationFile });
}

setup('successful login to shelf-life application', async ({ page }) => {
	await login(page);
});
