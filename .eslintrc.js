module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},

	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
	},

	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'plugin:prettier/recommended',
	],

	plugins: ['@typescript-eslint'],

	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/script-setup-no-uses-vars': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
};
