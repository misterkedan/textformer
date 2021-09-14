class Textform {

	/**
	 * Text transform between two texts, using multiple character changes to transition from one to the other.
	 *
	 * @constructor
	 * @param { Object } 	options
	 * @param { String } 	options.from		Initial text.
	 * @param { String } 	options.to			Final text.
	 * @param { Number } 	options.steps		Number of character changes between both texts.
	 * @param { Number } 	options.stagger		Stagger ( in steps ) between different characters.
	 * @param { Element }	options.output		DOM element the text will be output to.
	 * @param { String } 	options.charset		Concatenated character pool for random character changes.
	 * @param { Function } 	options.align		Function to align both texts by filling the shorter text to match the longer text's length.
	 * @param { String } 	options.fill		A single fill character used by the align function, will generate random characters if undefined.
	 */
	constructor( {
		// steps, stagger, output, charset,
		from, to, align, fill
	} = {} ) {

		Object.assign( this, arguments[ 0 ] );

		this.length = Math.max( from.length, to.length );

		this.alignTexts( align, fill );
		this.build();
		this.reset();

	}

	/*-----------------------------------------------------------------------------/

		Init

	/-----------------------------------------------------------------------------*/

	/**
	 * Fills the shortest string to match the longer string's length ( between this.from and this.to ).
	 * For example, aligning "A" with "Four" using Textform.aligns.RIGHT and "*" as a fill will replace "A" with "***A"
	 * @param { Function }	method	A fill method from Textform.aligns
	 * @param { String }	fillChar 	A character used to fill
	 */
	alignTexts( method, fillChar ) {

		if ( ! method ) return;

		const diff = this.to.length - this.from.length;
		if ( diff === 0 ) return;

		//?// Determine text to fill ( the shorter one )
		const toIsLonger = ( diff > 0 );
		const prop = toIsLonger ? 'from' : 'to';
		const text = this[ prop ];

		//?// Create filler string
		const length = Math.abs( diff );
		const generateFillChar = ( fillChar )
			? () => fillChar
			: () => this.generateRandomChar();
		const fill = Array.from( { length } )
			.map( generateFillChar )
			.join( '' );

		//?// Fill using Textfrom.aligns method
		this[ prop ] = method( text, fill );

	}

	/**
	 * Builds a scenario array to prepare all character changes
	 *
	 * Contains one Array for each character of the text, which itself contains
	 * Objects describing character changes using the structure { frame, char }
	 *
	 * Example :
	 * [
	 * 		[{frame:1, char:"H"}, {frame:3, char:"Z"}],
	 * 		[{frame:5, char:"N"}],
	 * ]
	 * The first character will change to "H" on frame 1, and to "Z" on frame 3.
	 * The second character will change to "N" on frame 5.
	 */
	build() {

		const { length, from, to, steps } = this;
		const startFrames = this.computeStartFrames();
		const scenario = [];

		for ( let i = 0; i < length; i ++ ) {

			const changes = [];
			const startFrame = startFrames[ i ];
			const endFrame = startFrame + steps;
			const startChar = from.charAt( i );
			const endChar = to.charAt( i );

			changes.push( { frame: startFrame, char: startChar } );

			for ( let frame = startFrame + 1; frame < endFrame; frame ++ ) {

				const char = this.generateRandomChar();
				changes.push( { frame, char } );

			}

			changes.push( { frame: endFrame, char: endChar } );

			scenario[ i ] = changes;

		}

		this.scenario = scenario;

		this.totalFrames = Math.max.apply(
			Math,
			scenario.map( ( char ) => char.map( change => change.frame ) )
				.flat()
		);

	}

	/**
	 * Method used by the build() method to generate an array of staggered
	 * starting frames. The default behavior is staggering rightward.
	 *
	 * Override this method in subclasses to change the animation.
	 *
	 * @returns { Array } Array of staggered starting frames
	 */
	computeStartFrames() {

		const { length, stagger } = this;

		return Array.from( { length } ).map( ( _, i ) => i * stagger );

	}

	/*-----------------------------------------------------------------------------/

		Update

	/-----------------------------------------------------------------------------*/

	generateRandomChar() {

		const charset = this.charset;
		const randomIndex = Math.floor( Math.random() * charset.length );
		return charset.charAt( randomIndex );

	}

	getCharAt( i, frame ) {

		const scenario = this.scenario[ i ];

		let change = scenario.filter( change => change.frame === frame )[ 0 ];

		if ( ! change ) {

			const startFrame = scenario[ 0 ].frame;
			const endFrame = scenario[ scenario.length - 1 ].frame;
			const closestFrame = frame > endFrame ? endFrame : startFrame;
			change = scenario.filter( change => change.frame === closestFrame )[ 0 ];

		}

		return change.char;

	}

	reset() {

		this.progress = 0;

	}

	update() {

		const { frame, length } = this;
		const getCharAt = this.getCharAt.bind( this );

		this.text = Array.from( { length } )
			.map( ( _, i ) => getCharAt( i, frame ) )
			.join( '' );

		if ( this.output ) this.output.innerHTML = this.text.replace( / /g, '&nbsp;' );

	}

	/*-----------------------------------------------------------------------------/

		Getters / Setters

	/-----------------------------------------------------------------------------*/

	get frame() {

		return this._frame;

	}

	set frame( frame ) {

		if ( frame === this._frame ) return;

		this._frame = frame;
		this.update();

	}

	get progress() {

		return this._progress;

	}

	set progress( progress ) {

		this._progress = progress;
		this.frame = Math.round( this.totalFrames * progress );

	}

}

/*-----------------------------------------------------------------------------/

	Static

/-----------------------------------------------------------------------------*/

Textform.charsets = {
	UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGITS: '0123456789',
	SYMBOLS: '!@#$%&?',
};
Textform.charsets.LOWERCASE = Textform.charsets.UPPERCASE.toLowerCase();
Textform.charsets.ALL = Object.values( Textform.charsets ).join( '' );

Textform.aligns = {
	none: false,
	left: ( text, fill ) => `${text}${fill}`,
	center: ( text, fill ) => {

		const length = fill.length;
		const half = Math.floor( length / 2 );
		//?// Alignment will be slightly on the left in case of odd fill lenghts

		const leftFill = fill.substring( 0, half );
		const rightFill = fill.substring( half, length );

		return `${leftFill}${text}${rightFill}`;

	},
	right: ( text, fill ) => `${fill}${text}`,
};

export { Textform };
