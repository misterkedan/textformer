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
	 * @param { Number } 	options.randomness	Steps and stagger maximum randomness.
	 * @param { Number } 	options.origin		Character index the animation starts from.
	 * @param { Element }	options.output		DOM element the text will be output to.
	 * @param { String } 	options.charset		Concatenated character pool for random character changes.
	 * @param { Function } 	options.align		Function to align both texts by filling the shorter text to match the longer text's length.
	 * @param { String } 	options.fill		A single fill character used by the align function, will generate random characters if undefined.
	 */
	constructor( {
		// steps, stagger, randomness, origin, output, charset,
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
		const fill = Array.from( { length }, generateFillChar ).join( '' );

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

		const { length, from, to } = this;
		const startFrames = this.computeStartFrames();

		console.log( startFrames );

		let finalFrame = 0;

		const buildCharAt = ( i ) => {

			const steps = this.randomize( this.steps );

			const startFrame = startFrames[ i ];
			const endFrame = startFrame + steps;
			const startChar = from.charAt( i );
			const endChar = to.charAt( i );

			const buildStep = ( step ) => {

				const frame = startFrame + step;
				if ( frame > finalFrame ) finalFrame = frame;
				const char = ( frame === startFrame ) ? startChar
					: ( frame === endFrame ) ? endChar
						: this.generateRandomChar();
				return { frame, char };

			};

			return Array.from(
				{ length: steps + 1 },
				( _, step ) => buildStep( step )
			);

		};

		this.scenario = Array.from( { length }, ( _, i ) => buildCharAt( i ) );

		this.totalFrames = finalFrame + 1;

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

		const { length, stagger, origin } = this;

		if ( origin ) return Array.from( { length }, ( _, i )=> {

			const offset = i - origin;
			const offsetStartFrame = ( offset >= 0 )
				? offset * stagger
				: ( length + offset ) * stagger;

			return this.randomize( offsetStartFrame );

		} );

		return Array.from( { length }, ( _, i ) => {

			const startFrame = i * stagger;
			return this.randomize( startFrame );

		} );

	}

	randomize( value, minMultiplier = 0, maxMultiplier = 1 ) {

		const { randomness } = this;

		if ( ! randomness ) return value;

		const min = value - minMultiplier * randomness;
		const max = value + maxMultiplier * randomness;

		return Textform.generateRandomInt( min, max );

	}

	/*-----------------------------------------------------------------------------/

		Update

	/-----------------------------------------------------------------------------*/

	generateRandomChar() {

		const { charset } = this;
		const randomIndex = Textform.generateRandomInt( 0, charset.length - 1 );
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

		this.chars = Array.from(
			{ length },
			( _, i ) => this.getCharAt( i, frame )
		);

		this.text = this.chars.join( '' );

		if ( this.output )
			this.output.innerHTML = this.text.replace( / /g, '&nbsp;' );

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

	/*-----------------------------------------------------------------------------/

		Read-only

	/-----------------------------------------------------------------------------*/

	get hasValidOrigin() {

		const { origin, length } = this;

		return ( origin !== undefined && origin >= 0 && origin < length );

	}

}

/*-----------------------------------------------------------------------------/

	Static

/-----------------------------------------------------------------------------*/

Textform.generateRandomInt = ( min, max ) =>
	Math.floor( Math.random() * ( max - min + 1 ) + min );

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

		//?// Slightly on the left on odd fill lengths
		const center = Math.floor( length / 2 );

		const leftFill = fill.substring( 0, center );
		const rightFill = fill.substring( center, length );

		return `${leftFill}${text}${rightFill}`;

	},
	right: ( text, fill ) => `${fill}${text}`,
};

export { Textform };
