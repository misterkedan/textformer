import { Textform } from './textforms/Textform.js';
import { RandomLinearTextform } from './textforms/RandomLinearTextform.js';
import { TextformPlayer } from './TextformPlayer.js';

class Textformer {

	constructor( {

		//?// Textform settings

		texts = [ '', 'Textformer' ],
		charset = Textform.charsets.ALL,
		steps = 5,
		stagger = 3,

		//?// TextformPlayer settings

		fps = 15,
		onBegin = null,
		onUpdate = null,
		onComplete = null,

		//?// Textform animation mode

		mode = Textformer.modes.linear,

		//?// Textform animation mode

		autoPlay = true,

	} = {} ) {

		if ( ! texts || ! Array.isArray( texts ) || typeof ( texts[ 0 ] ) !== 'string'  ) {

			throw new TypeError( 'Parameter "texts" must be an array of strings' );

		}

		const options = { texts, charset, steps, stagger };
		Object.assign( this, { mode, options, fps, onBegin, onUpdate, onComplete, autoPlay } );

		if ( this.autoPlay ) this.player = new TextformPlayer( { fps, onBegin, onUpdate, onComplete } );

		this.build();

	}

	build() {

		if ( this.mode.prototype instanceof Textform === false ) throw new Error( 'Please select a mode from Texformer.modes' );
		const textform = new this.mode( this.options );
		this.textform = textform;

		if ( this.autoPlay ) {

			this.player.textform = textform;
			this.replay();

		}

	}

	play() {

		this.player.play();

	}

	replay() {

		this.player.replay();

	}

	get text() {

		return this.textform.text;

	}

}

Textformer.modes = {

	linear: RandomLinearTextform

};

export { Textformer };
