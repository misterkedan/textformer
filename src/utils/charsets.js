const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = UPPERCASE.toLowerCase();
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%&?';
const ALL = [ UPPERCASE, LOWERCASE, DIGITS, SYMBOLS ].join( '' );

const charsets = { UPPERCASE, LOWERCASE, DIGITS, SYMBOLS, ALL };

export { charsets };
