module.exports = {
	// Type check TypeScript files
	'**/*.(ts|tsx)': () => 'pnpm run tsc --noEmit',

	// Lint & Prettify TS and JS files
	'**/*.(vue|ts|tsx|js)': (filenames) => [
		`pnpm run eslint --fix ${filenames.join(' ')}`,
		`pnpm run prettier --fix --write ${filenames.join(' ')}`,
	],

	// Prettify only Markdown and JSON files
	'**/*.(md|json)': (filenames) =>
		`pnpm run prettier --write ${filenames.join(' ')}`,
};
