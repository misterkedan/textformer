const charsets = {
	UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGITS: '0123456789',
	SYMBOLS: '!@#$%&?',
};
charsets.LOWERCASE = charsets.UPPERCASE.toLowerCase();
charsets.ALL = Object.values( charsets ).join( '' );

export { charsets };
