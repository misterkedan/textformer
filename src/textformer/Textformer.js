// import { TextformCommand } from './TextformCommand.js';

import { linear } from './transitions/linear.js';

class Textformer {

	constructor(

		//?// Parameter 1 - Array of key texts
		texts = [ '', 'textformer' ],

		//?// Parameter 2 - Options
		{
			charset = Textformer.charsets.ALL,
			transition = Textformer.transitions.linear,
			steps = 5,
			stagger = 1,
			loop = false,
		} = {}

	) {

		if ( ! texts || ! Array.isArray( texts ) || typeof ( texts[ 0 ] ) !== 'string'  ) {

			throw new TypeError( 'Parameter "texts" must be an array of strings' );

		}

		this.texts = texts;

		Object.assign( this, { charset, transition, steps, stagger, loop } );

		this.build();

	}

	build() {

		this.maxLength = this.texts.reduce(
			( a, b ) => a.length > b.length ? a.length : b.length
		);

		this.frames = this.transition( this );
		this.finalFrame = this.frames.length - 1;

		this.currentFrame = 0;
		this.chars = this.texts[ 0 ].split( '' );

		console.log( this.text );

	}

	step() {

		if ( this.currentFrame < this.finalFrame ) {

			this.currentFrame ++;
			this.update();
			console.log( this.text );

		} else if ( this.loop != 0 ) {

			this.loop --;
			this.currentFrame = 0;
			this.update();

		}

	}

	update() {

		const commands = this.frames[ this.currentFrame ];

		for ( let i in commands ) {

			const command = commands[ i ];
			this.chars[ command.i ] = command.char;
			// console.log( command );

		}

		// console.log( commands );

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

Textformer.charsets = {

	UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGITS: '0123456789',
	SPECIAL: '!@#$%&?',

};
Textformer.charsets.ALL = Object.values( Textformer.charsets ).join( '' );

Textformer.transitions = { linear };

export { Textformer };
