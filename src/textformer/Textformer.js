import { Textform } from './textforms/Textform.js';
import { RandomLinearTextform } from './textforms/RandomLinearTextform.js';
import { TextformPlayer } from './TextformPlayer.js';

class Textformer {

	/**
	 * Easy text tranform animation, based on random character changes.
	 * @constructor
	 * @param { Object }	options
	 * @param { Class }		options.mode		Animation mode, pick one from Textformer.modes.
	 * @param { Boolean } 	options.autoPlay	Animates automatically using the built-in TextformPlayer.
	 * @param { String } 	options.from		Initial text.
	 * @param { String } 	options.to			Final text.
	 * @param { Number } 	options.steps		Number of character changes between both texts.
	 * @param { Number } 	options.stagger		Stagger ( in steps ) between different characters.
	 * @param { String } 	options.charset		Concatenated character pool for random character changes.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds.
	 * @param { Function }	options.onBegin		Optional callback fired when the animation starts.
	 * @param { Function }	options.onChange	Optional callback fired on each Textform character change.
	 * @param { Function }	options.onComplet	Optional callback fired when the animation ends.
	 */
	constructor( {

		mode = Textformer.modes.linear,
		autoPlay = true,

		//?// Textform settings
		from = '',
		to = 'Textformer',
		steps = 5,
		stagger = 3,
		charset = Textform.charsets.ALL,

		//?// TextformPlayer settings
		duration = 3000,
		onBegin,
		onChange,
		onComplete,

	} = {} ) {

		Object.assign( this, {
			mode,
			autoPlay,
			options: { from, to, steps, stagger, charset },
			playerOptions: { duration, onBegin, onChange, onComplete }
		} );

		this.build();

	}

	build() {

		if ( this.mode.prototype instanceof Textform === false ) throw new Error( 'Please select a mode from Texformer.modes' );

		const textform = new this.mode( this.options );
		this.textform = textform;

		if ( this.autoPlay ) {

			this.playerOptions.textform = textform;
			this.player = new TextformPlayer( this.playerOptions );
			this.play();

		}

	}

	play() {

		this.player.play();

	}

	replay() {

		this.player.stop();
		this.textform.reset();
		this.player.play();

	}

	/*-----------------------------------------------------------------------------/

		Getters / Setters

	/-----------------------------------------------------------------------------*/

	get progress() {

		return this.textform.progress;

	}

	set progress( progress ) {

		this.textform.progress = progress;

	}

	/*-----------------------------------------------------------------------------/

		Read-only

	/-----------------------------------------------------------------------------*/

	get text() {

		return this.textform.text;

	}

}

/*-----------------------------------------------------------------------------/

	Static

/-----------------------------------------------------------------------------*/

Textformer.modes = {

	linear: RandomLinearTextform

};

export { Textformer };
