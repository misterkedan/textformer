const stringAlign = {

	/**
	 * Pads a string with another string until it matches the specified
	 * length, aligning it on the left, right, center, or fixed position.
	 *
	 * Example:
	 * stringAlign.pad( 'bar', stringAlign.to.RIGHT, 'foo', 5 );
	 * //=> 'fobar'
	 *
	 * @param { String } 	string		A string to align
	 * @param { String | Number }
	 * 						to			The align position.
	 * 									Either pick one from align.to,
	 * 									or specify an index to align at.
	 * 									Invalid values will default to 0.
	 * @param { String } 	fill		String used for padding
	 * @param {	Number } 	length 		Length to pad up to
	 * @returns
	 */
	pad: ( string, to, fill, length ) => {

		const diff = length - string.length;

		if ( diff === 0 ) return string;

		const convertTo = {
			left: () => 0,
			center: () => Math.floor( diff / 2 ),
			right: () => diff,
			default: () => to,
		};
		const insertAt = ( convertTo[ to ] || convertTo[ 'default' ] )();
		const insertInto = ( a, b, i ) => [ a.slice( 0, i ), b, a.slice( i ) ]
			.join( '' );

		return insertInto( fill, string, insertAt ).slice( 0, length );

	},

	/**
	 * Pads the shorter strings from a set to match the longest string's
	 * length, using a fill string.
	 *
	 * Example:
	 * stringAlign.align( ['foooo', 'bar', 'a' ], stringAlign.to.RIGHT, '123' );
	 * //=> [ 'foooo', '12bar', '1234a' ]
	 *
	 * @param { [ String ] }	strings		An array of strings to align.
	 * @param { String | Number }
	 * 							to			The align position.
	 * 										Either pick one from align.to,
	 * 										or specify an index to align at.
	 * 										Invalid values will default to 0.
	 * @param { String } 		fill 		String used for padding.
	 */
	align: ( strings, to, fill ) => {

		if ( to === stringAlign.to.NONE ) return strings;

		if ( ! fill ) fill = ' ';

		const length = strings.reduce(
			( length, string ) => Math.max( length, string.length )
			, 0
		);

		const fillLength = fill.length;
		const ratio = Math.ceil( length / fillLength );
		const computedFill = fill.repeat( ratio ).substring( 0, length );

		return strings.map(
			string => stringAlign.pad( string, to, computedFill, length )
		);

	},

	to: {
		NONE: 'none',
		LEFT: 'left',
		CENTER: 'center',
		RIGHT: 'right',
	}

};

export { stringAlign };
