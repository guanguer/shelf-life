import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

if (existsSync('.env')) {
	process.loadEnvFile('.env');
}

export default defineConfig({
	testDir: 'tests',
	testIgnore: ['**/labs/fixtures/**', '**/labs/broken-traces/**'],
	webServer: {
		command: 'npm run build && npm run preview -- --host localhost --port 4173',
		url: 'http://localhost:4173',
		reuseExistingServer: true
	},
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure'
	},
	projects: [
		{
			name: 'setup',
			testMatch: 'tests/auth.setup.ts'
		},
		{
			name: 'chromium',
			use: {
				storageState: 'playwright/.authentication/user.json'
			},
			dependencies: ['setup']
		}
	],
	reporter: [
		['html', { open: 'never', outputFolder: 'playwright-report/html' }],
		['json', { outputFile: 'playwright-report/report.json' }],
		['list']
	]
});
