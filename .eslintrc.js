module.exports = {
	env: {
		commnonjs: true,
		es2021: true,
		node: true,
		jest: true,
	},
	extends: 'eslint:recommended',
	// globals: {
	// 	Atomics: 'readonly',
	// 	SharedArrayBuffer: 'readonly',
	// },
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 4],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		eqeqeq: 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],
		'no-console': 0,
	},
};
// module.exports = {
// 	extends: './index.js',
// 	rules: {
// 		// disable requiring trailing commas because it might be nice to revert to
// 		// being JSON at some point, and I don't want to make big changes now.
// 		'comma-dangle': 0,
// 	},
// };
