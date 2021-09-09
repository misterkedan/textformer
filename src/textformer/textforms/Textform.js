class Textform {

	/**
	 * Text transform between two texts, using multiple character changes to transition from one to the other.
	 * @constructor
	 * @param { Object } options
	 * @param { String } options.from		Initial text.
	 * @param { String } options.to			Final text.
	 * @param { Number } options.steps		Number of character changes between both texts.
	 * @param { Number } options.stagger	Stagger ( in steps ) between different characters.
	 * @param { String } options.charset	Concatenated character pool for random character changes.
	 */
	constructor( { from, to, steps, stagger, charset } = {} ) {

		Object.assign( this, { from, to, steps, stagger, charset } );

		this.length = ( from.length > to.length ) ? from.length : to.length;

		this.build();
		this.reset();

	}

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

	}

	/*-----------------------------------------------------------------------------/

		Getters / Setters

	/-----------------------------------------------------------------------------*/

	get frame() {

		return this._frame;

	}

	set frame( frame ) {

		if ( frame === this._frame ) return;

		// if ( frame < 0 ) frame = 0;
		// else if ( frame > this.totalFrames ) frame = this.totalFrames;

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

export { Textform };
