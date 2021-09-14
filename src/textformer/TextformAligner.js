class TextformAligner {

	//?// Static utility class, no constructor

}

/**
 * Fills the shortest string to match the longer string's length
 * ( between a textform.from and textform.to ).
 * For example, aligning "A" with "Four" using TextformAligner.modes.RIGHT
 * and "*" as a fill will replace "A" with "***A"
 * @param { Function }	method	A fill method from Textform.aligns
 * @param { String }	fillChar 	A character used to fill
 */
TextformAligner.align = ( textform ) => {

	const { from, to, align, fill } = textform;

	if ( align === undefined ) return;

	const modes = TextformAligner.modes;
	const method = ( isNaN( align ) )
		? align
		: ( align >= 0 )
			? ( align < textform.length )
				? modes.offset
				: modes.right
			: modes.left;

	const diff = to.length - from.length;
	if ( diff === 0 ) return;

	//?// Determine text to fill ( the shorter one )
	const toIsLonger = ( diff > 0 );
	const prop = toIsLonger ? 'from' : 'to';
	const text = textform[ prop ];

	//?// Create filler string
	const length = Math.abs( diff );
	const generateFillChar = ( fill )
		? () => fill
		: () => textform.generateRandomChar();
	const filler = Array.from( { length }, generateFillChar ).join( '' );

	//?// Fill using Textfrom.aligns method
	textform[ prop ] = method( text, filler, align );

};

TextformAligner.modes = {
	none: undefined,
	left: ( text, fill ) => `${text}${fill}`,
	center: ( text, fill, center ) => {

		const length = fill.length;

		//?// Slightly on the left on odd fill lengths
		if ( isNaN( center ) ) center = Math.floor( length / 2 );

		const leftFill = fill.substring( 0, center );
		const rightFill = fill.substring( center, length );
		return `${leftFill}${text}${rightFill}`;

	},
	right: ( text, fill ) => `${fill}${text}`,
	offset: ( text, fill, offset ) =>
		TextformAligner.modes.center( text, fill, Math.round( offset ) )


};

export { TextformAligner };
