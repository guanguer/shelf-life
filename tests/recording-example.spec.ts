import { test, expect } from '@playwright/test';

test.use({
	serviceWorkers: 'block',
	storageState: './playwright/.authentication/user.json'
});

test('search by author returns results', async ({ page }) => {
	await page.routeFromHAR('../playwright/shelf-life/playwright/recordings/openlibrary.har', {
		url: '**/openlibrary.org/**',
		update: true
	});
	await page.goto('/search');
	const searchField = await page.getByRole('textbox', { name: 'Search by title, author, or' });
	await searchField.click();
	await searchField.fill('Hemingway');
	await page.getByRole('button', { name: 'Search' }).click();
	await expect(page.getByRole('heading', { name: 'Search results' })).toBeVisible();
	await expect(page.getByText('10 results')).toBeVisible();
});
