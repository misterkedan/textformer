class StringAligner {

	/**
	 * Pads the shortest strings to match the longer string's length
	 * For example, aligning "A" with "Four" using StringAligner.mode.RIGHT
	 * and "*" as a fill will replace "A" with "***A"
	 *
	 * @param { [ String ] }	input	An array of strings to align.
	 * @param { String | Number }
	 * 							to		The align mode, pick one from StringAligner.modes
	 * 									Can also be a specific index to insert at.
	 * 									Invalid values will default to 0.
	 * @param { String } 		fill 	String used to pad the shorter strings.
	 */
	constructor(
		input,
		to = StringAligner.to.LEFT,
		fill = '',
	) {

		if ( ! fill ) fill = ' ';
		Object.assign( this, { input, to, fill } );
		this.compute();

	}

	compute() {

		const { input, fill } = this;

		const length = input
			.reduce( ( length, string ) => Math.max( length, string.length ), 0 );
		this.length = length;

		const fillLength = fill.length;
		const ratio = Math.ceil( length / fillLength );
		const computedFill = fill.repeat( ratio ).substring( 0, length - 1 );

		this.output = this.input.map( string => this.align( string, computedFill ) );

	}

	align( string, fill ) {

		const { length, to } = this;

		const diff = length - string.length;

		if ( diff === 0 ) return string;

		const convertTo = {
			left: () => 0,
			center: () => Math.floor( diff / 2 ),
			right: () => diff,
			default: () => to,
		};
		const insertAt = ( convertTo[ to ] || convertTo[ 'default' ] )();
		const insertInto = ( a, b, i ) => [ a.slice( 0, i ), b, a.slice( i ) ].join( '' );

		return insertInto( fill, string, insertAt ).slice( 0, length );

	}

}

StringAligner.to = {
	NONE: 'none',
	LEFT: 'left',
	CENTER: 'center',
	RIGHT: 'right',
};

export { StringAligner };
