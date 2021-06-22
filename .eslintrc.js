module.exports = {
	'env': {
		'browser': true,
		'es2020': true
	},

	'extends': [
		'eslint:recommended',
		'mdcs'
	],

	'ignorePatterns': [ 'dist/*', 'build/*', 'test/*', 'vendor/*', '_/*' ],

	'parserOptions': {
		'ecmaVersion': 11,
		'sourceType': 'module',
	},

	'rules': {
		'indent': 'warn',
		'key-spacing': 'off',
		'no-multi-spaces': 'off',
		'quotes': [ 'error', 'single' ],
	},
};
