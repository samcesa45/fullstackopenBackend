// module.exports = {
//   env: {
//     browser: true,
//     commonjs: true,
//     es2021: true,
//   },
//   extends: 'eslint:recommended',
//   parserOptions: {
//     ecmaVersion: 12,
//   },
//   rules: {
//     indent: ['error', 2],
//     'linebreak-style': ['error', 'unix'],
//     quotes: ['error', 'single'],
//     semi: ['error', 'never'],
//     eqeqeq: 'error',
//     'no-trailing-spaces': 'error',
//     'object-curly-spacing': ['error', 'always'],
//     'arrow-spacing': ['error', { before: true, after: true }],
//   },
// }

module.exports = {
	extends: './server.js',
	rules: {
		// disable requiring trailing commas because it might be nice to revert to
		// being JSON at some point, and I don't want to make big changes now.
		'comma-dangle': 0,
	},
};
