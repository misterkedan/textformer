class Textform {

	/**
	 * Text transform between two texts, using multiple character changes to transition from one to the other.
	 * @constructor
	 * @param { Object } 	options
	 * @param { Element }	options.output		DOM element the text will be output to.
	 * @param { String } 	options.from		Initial text.
	 * @param { String } 	options.to			Final text.
	 * @param { Number } 	options.steps		Number of character changes between both texts.
	 * @param { Number } 	options.stagger		Stagger ( in steps ) between different characters.
	 * @param { String } 	options.charset		Concatenated character pool for random character changes.
	 * @param { Function } 	options.align		Function to align both texts by filling the shorter text to match the longer text's length.
	 * @param { String } 	options.fill		A single fill character used by the align function, will generate random characters if undefined.
	 */
	constructor( { output, from, to, steps, stagger, charset, align, fill } = {} ) {

		Object.assign( this, { output, from, to, steps, stagger, charset } );

		this.length = Math.max( from.length, to.length );

		this.align( align, fill );
		this.build();
		this.reset();

	}

	/**
	 * Fills the shortest string to match the longer string's length ( between this.from and this.to ).
	 * For example, aligning "A" with "Four" using Textform.aligns.RIGHT and "*" as a fill will replace "A" with "***A"
	 * @param { Function }	method	A fill method from Textform.aligns
	 * @param { String }	fillChar 	A character used to fill
	 */
	align( method, fillChar ) {

		if ( ! method ) return;

		const diff = this.to.length - this.from.length;
		if ( diff === 0 ) return;

		//?// Determine text to fill ( the shorter one )
		const toIsLonger = ( diff > 0 );
		const prop = toIsLonger ? 'from' : 'to';
		const text = this[ prop ];

		//?// Create filler string
		const fill = [];
		const absDiff = Math.abs( diff );
		for ( let i = 0; i < absDiff; i ++ ) fill.push( fillChar || this.getRandomChar() );

		//?// Fill using Textfrom.aligns method
		this[ prop ] = method( text, fill.join( '' ) );

	}

	/**
	 * Builds a character changes array, which acts like a storyboard for the transform.
	 * Exact method to be determined in the subclass.
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

		this.changes = [];
		console.warn( 'Abstract class' );

	}

	getRandomChar() {

		const charset = this.charset;
		const randomIndex = Math.floor( Math.random() * charset.length );
		return charset.charAt( randomIndex );

	}

	getCharAtFrame( i, frame ) {

		const changes = this.changes[ i ];

		let change = changes.filter( change => change.frame === frame )[ 0 ];

		if ( ! change ) {

			const startFrame = changes[ 0 ].frame;
			const endFrame = changes[ changes.length - 1 ].frame;
			const closestFrame = frame > endFrame ? endFrame : startFrame;
			change = changes.filter( change => change.frame === closestFrame )[ 0 ];

		}

		return change.char;

	}

	reset() {

		this.progress = 0;

	}

	update() {

		const frame = this.frame;
		const chars = [];

		for ( let i = 0, l = this.length; i < l; i ++ ) {

			chars.push( this.getCharAtFrame( i, frame ) );

		}

		this.text = chars.join( '' );

		if ( this.output ) this.output.textContent = this.text;

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

	NONE: false,
	LEFT: ( text, fill ) => text + fill,
	CENTER: ( text, fill ) => {

		const length = fill.length;
		const half = Math.floor( length / 2 ); //?// Alignment will be slightly on the left in case of odd fill lenghts
		const fill1 = fill.substring( 0, half );
		const fill2 = fill.substring( half, length );
		return fill1 + text + fill2;

	},
	RIGHT: ( text, fill ) => fill + text,


};

export { Textform };
