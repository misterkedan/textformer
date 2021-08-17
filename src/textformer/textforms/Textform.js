class Textform {

	constructor( { texts, charset, steps, stagger } = {} ) {

		Object.assign( this, { texts, charset, steps, stagger } );

		this.maxLength = this.texts.reduce(
			( a, b ) => a.length > b.length ? a.length : b.length
		);

		this.build();
		this.finalFrame = this.frames.length - 1;

		this.currentFrame = 0;
		this.chars = this.texts[ 0 ].split( '' );

	}

	build() {

		this.frames = [];
		console.warn( 'Abstract class' );

	}

	step() {

		if ( this.currentFrame < this.finalFrame ) {

			this.currentFrame ++;
			this.update();

			if ( this.currentFrame === this.finalFrame ) this.isComplete = true;

		}

	}

	update() {

		const changes = this.frames[ this.currentFrame ];

		for ( let i in changes ) {

			const change = changes[ i ];
			this.chars[ change.i ] = change.char;

		}

	}

	getRandomChar() {

		const charset = this.charset;
		const randomIndex = Math.floor( Math.random() * charset.length );
		return charset.charAt( randomIndex );

	}

	get text() {

		return this.chars.join( '' );

	}

}

Textform.charsets = {

	UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGITS: '0123456789',
	SPECIAL: '!@#$%&?',

};
Textform.charsets.LOWERCASE = Textform.charsets.UPPERCASE.toLowerCase();
Textform.charsets.ALL = Object.values( Textform.charsets ).join( '' );

export { Textform };
