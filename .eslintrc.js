module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'mdcs'
	],
	'ignorePatterns': [
		'lib/*', 'vendor/*', '*.min.js', '_/*'
	],
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module',
	},
	'rules': {
		'indent': 'warn',
		'key-spacing': 'off',
		'no-multi-spaces': 'off',
		'quotes': [ 'error', 'single' ],
	},
};
