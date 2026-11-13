import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/playground');
});

test('"Add to shelf" button exists', async ({ page }) => {
	await expect(page.getByRole('button', { name: 'Add to shelf' })).toBeVisible();
});

test('"Cancel" button exists', async ({ page }) => {
	await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
});

test('"Out of stock" button exists and it is disabled', async ({ page }) => {
	await expect(page.getByRole('button', { name: 'Out of stock' })).toBeDisabled();
});

test('there is a "Search" form field', async ({ page }) => {
	await expect(page.getByLabel('Search')).toBeVisible();
});

test('locate the first "Delete" button on the playground page', async ({ page }) => {
	await expect(page.getByRole('button', { name: 'Delete' }).first()).toBeVisible();
});

test('locate the "Remove" button inside the third item in the "Reading List"', async ({ page }) => {
	const readingList = page.getByRole('list', { name: 'Reading list' });
	const thirdItem = readingList.getByRole('listitem').nth(2);
	await expect(thirdItem.getByRole('button', { name: 'Remove' })).toBeVisible();
});

test('locate the "Rate this book" button inside the "Piranesi" article', async ({ page }) => {
	const article = page.getByRole('article', { name: /Piranesi/ });
	await expect(article.getByRole('button', { name: 'Rate this book' })).toBeVisible();
});

test('locate the "Author" input field and assert its hint text', async ({ page }) => {
	await expect(page.getByLabel('Author')).toBeVisible();
	await expect(page.getByText('Last name, first name')).toBeVisible();
});

test('locate a paragraph that mentions "42 days"', async ({ page }) => {
	await expect(page.getByText(/42 days./)).toBeVisible();
});

test('locate the text "3 of 12 books finished"', async ({ page }) => {
	await expect(page.getByText('3 of 12 books finished')).toBeVisible();
});

test('locate the paragraph that says "You have 4 books on your shelf right now"', async ({
	page
}) => {
	await expect(page.getByText('You have 4 books on your shelf right now')).toBeVisible();
});

test('assert table "Book ratings" has exactly 3 rows', async ({ page }) => {
	const bookRatings = page.getByRole('table', { name: 'Book ratings' });
	const dataRows = bookRatings.getByRole('row').filter({ hasNot: page.getByRole('columnheader') });
	await expect(dataRows).toHaveCount(3);
});

test('assert "Reading list" has exactly 4 items', async ({ page }) => {
	const readingList = page.getByRole('list', { name: 'Reading list' });
	await expect(readingList.getByRole('listitem')).toHaveCount(4);
});

test('click "Show details" and asset that the detail paragraph appears', async ({ page }) => {
	await page.getByRole('button', { name: 'Show details' }).click();
	await expect(page.getByText(/Station Eleven is a post-apocalyptic novel/)).toBeVisible();
});

test('click "Load more" ans assert the list "Newly loaded books" has 2 items', async ({ page }) => {
	await page.getByRole('button', { name: 'Load more' }).click();
	const newList = page.getByRole('list', { name: 'Newly loaded books' });
	await expect(newList.getByRole('listitem')).toHaveCount(2);
});

test('assert that "Loading..." is visible and then disappear and "Content loaded" appears', async ({
	page
}) => {
	await expect(page.getByText('Loading...')).toBeVisible();
	await expect(page.getByText('Content loaded')).toBeVisible();
	await expect(page.getByText('Loading...')).toBeHidden();
});

test('click "Rate this book" button in the Dialogs section and assert that a dialog appears', async ({
	page
}) => {
	await page.getByRole('button', { name: 'Rate this book' }).last().click();
	await expect(page.getByRole('dialog')).toBeVisible();
});

test('rate with 4 stars inside of the Dialog and save, asserting the Dialog is hidden', async ({
	page
}) => {
	await page.getByRole('button', { name: 'Rate this book' }).last().click();
	await page.getByLabel('4 stars').check();
	await page.getByRole('button', { name: 'Save rating' }).click();
	await expect(page.getByRole('dialog')).toBeHidden();
});

test('close the Dialog by clicking on the "Cancel" button and assert the Dialog is no longer visible', async ({
	page
}) => {
	await page.getByRole('button', { name: 'Rate this book' }).last().click();
	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible();
	await dialog.getByRole('button', { name: 'Cancel' }).click();
	await expect(dialog).toBeHidden();
});

test('locate alert that says "Unsaved changes will be lost"', async ({ page }) => {
	await expect(page.getByRole('alert')).toBeVisible();
	await expect(page.getByRole('alert')).toHaveText('Unsaved changes will be lost');
});

test('locate progressbar and assert its aria-valuenow is 65', async ({ page }) => {
	await expect(page.getByRole('progressbar')).toBeVisible();
	await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '65');
});

test('locate "Toggle pannel" button and assert its aria-expanded changes after clicking on it', async ({
	page
}) => {
	const toggleButton = page.getByRole('button', { name: 'Toggle panel' });
	await expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
	await toggleButton.click();
	await expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
});
