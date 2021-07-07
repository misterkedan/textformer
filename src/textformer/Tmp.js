class TextformCommand {

	constructor( target, index, from, to ) {

		Object.apply( this, arguments );

	}

	execute() {

		this.target.text.charAt( i ) = this.to;

	}

}



class Textformer {

	constructor(

		//?// Parameter 1 - Array of key texts
		texts = [ '', 'textformer' ],

		//?// Parameter 2 - Options
		{
			charset = Textformer.charsets.ALL,
			mode = Textformer.modes.linear,
			steps = 5,
			stagger = 1,
			loop = false,
		} = {}

	) {

		this.options = { charset, mode, steps, stagger, loop };

		if ( ! texts || ! Array.isArray( texts ) || typeof ( texts[ 0 ] ) !== 'string'  ) {

			throw new TypeError( 'Parameter "texts" must be an array of strings' );

		}

		this.build( texts );

	}

	build( texts ) {

		this.options.maxLength = texts.reduce(
			( a, b ) => a.length > b.length ? a.length : b.length
		);

		this.frames = this.options.mode( texts, this.options );
		this.finalFrame = this.frames.length - 1;

		this.currentFrame = 0;

	}

	step() {

		if ( this.currentFrame < this.finalFrame ) {

			this.currentFrame ++;
			console.log( this.text );

		} else if ( this.options.loop != 0 ) {

			this.options.loop --;
			this.currentFrame = 0;

		}

	}

	get text() {

		return this.frames[ this.currentFrame ];

	}

}

Textformer.charsets = {

	UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGITS: '0123456789',
	SPECIAL: '!@#$%&?'

};

Textformer.charsets.ALL = ( function () {

	const cs = Textformer.charsets;
	return `${cs.UPPERCASE}${cs.DIGITS}${cs.SPECIAL}`;

} )();

Textformer.modes = {

	linear: ( texts, options ) => {

		const result = [];

		const text = blabla;

		const stagger = options.stagger;
		const steps = options.steps;
		const maxLength = options.maxLength;
		const textsLength = texts.length;

		for ( let text = 0; text < textsLength; text ++ ) {

			const startText = texts[ text ];
			const endText = texts[ text + 1 ] || texts[ textsLength - 1 ];

			for ( let i = 0; i < maxLength; i ++ ) {

				const startFrame = i * stagger;
				const endFrame = startFrame + steps;
				const startChar = startText.charAt( i );
				const endChar = endText.charAt( i );
				const randomChar = 'asd';

				for ( let frame = startFrame; frame <= endFrame; frame ++ ) {

					if ( ! result[ frame ] ) result[ frame ] = [];

					const step = frame - startFrame;

					const char = ( step === steps )
						? endChar
						: ( step === 0 )
							? startChar
							: randomChar;

					// result[ frame ].push( { i, char } );
					result[ frame ].push( new TextformCommand( ) );

				}

			}

		}

		/*

			chars: 4
			steps : 2
			stagger: 2

			0 abcd	c0 	f0
			1 #bcd	c0 	f1
			2 wbcd	c0 	f2	c1	f0
			3 w#cd			c1 	f1
			4 wxcd			c2  f2	c3	f0
			5 wx#d					c3  f1
			6 wxyd					c3	f2
			7 wxy#
			8 wxyz

		*/

		/*

		const totalFrames = maxLength * stagger + ( steps - 1 );

		for ( let frame = 0; frame < totalFrames; frame ++ ) {

			const staggerCount = stagger > 0 ? frame / stagger : 0;
			const startChar = staggerCount < maxLength ? staggerCount : maxLength;
			// const endChar = frame - stagger + steps > maxLength ? maxLength : frame - stagger + steps;
			// console.log( { startChar, endChar } );
			for ( let char = ( frame - stagger ) * stagger; char <= frame * stagger; char ++ ) {

				console.log( `${frame}/${char}/${texts[ 1 ].charAt( char )}` );

			}

			// console.log( frame );
			// console.log( text.charAt( i ) );

		}

		// for ( let text of texts ) result.push( text );
		*/

		return result;

	},

};

//?// Safest deep copy method
//?// https://stackoverflow.com/questions/31712808/how-to-force-javascript-to-deep-copy-a-string
Textformer.deepCopy = ( string ) => ( ' ' + string ).slice( 1 );

Textformer.getRandomChar = ( charset ) => {

	const randomIndex = Math.floor( Math.random() * charset.length );
	return charset.charAt( randomIndex );

};


export { TextformCommand };
export { Textformer };
