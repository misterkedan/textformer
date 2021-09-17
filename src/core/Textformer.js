import { Textform } from './Textform';
import { TextformPlayer } from './TextformPlayer';
import { ReversedTextform } from '../modes/ReversedTextform';
import { ExpandTextform } from '../modes/ExpandTextform';
import { CollapseTextform } from '../modes/CollapseTextform';
import { ShuffledTextform } from '../modes/ShuffledTextform';
import { StringAligner } from '../utils/StringAligner';

class Textformer {

	/**
	 * Easy text tranform animation, based on random character changes.
	 * @constructor
	 * @param { Object }	options
	 * @param { Class }		options.mode		Animation mode, pick one from Textformer.modes.

	 * @param { String } 	options.from		Initial text.
	 * @param { String } 	options.to			Final text.
	 * @param { Number } 	options.steps		Number of character changes between both texts.
	 * @param { Number } 	options.stagger		Stagger ( in steps ) between different characters.
	 * @param { Number } 	options.randomness	Steps and stagger maximum randomness.
	 * @param { Number } 	options.origin		Character index the animation starts from.
	 * @param { Element } 	options.output		DOM element the text will be output to.
	 * @param { String } 	options.charset		Concatenated character pool for random character changes.

	 * @param { Function } 	options.align		Function to align both texts by filling the shorter text to match the longer text's length. Can use a number to align both text at this index instead.
	 * @param { String } 	options.fill		A single fill character used by the align function, will generate random characters if undefined.
	 *
	 * @param { Object } 	options.autoplay	Automatic animation settings. Set to false for no automatic animation
	 * @param { Number } 	options.speed		Number of changes per second.
	 * @param { Number } 	options.delay		Delay before playing the animation, in milliseconds.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds. Overrides options.speed.
	 * @param { Function }	options.onBegin		Callback fired when the animation starts.
	 * @param { Function }	options.onChange	Callback fired on each Textform character change.
	 * @param { Function }	options.onComplet	Callback fired when the animation ends.
	 */
	constructor( {

		mode = Textformer.modes.default,

		//Textform settings
		from = '',
		to = '',
		steps = 5,
		stagger = 3,
		randomness = 0,
		origin,
		output,
		charset = Textformer.charsets.ALL,

		align = {
			to: Textformer.align.NONE,
			fill: ' ',
		},

		//TextformPlayer settings
		autoplay = {
			speed: 15,
			delay: 0,
			// duration, onBegin, onChange, onComplete,
		}


	} = {} ) {

		Object.assign( this, {
			mode,
			autoplay,
			options: {
				align,
				from, to, steps, stagger, randomness, origin, output, charset
			},
		} );

		this.build();

	}

	build() {

		this.destroy();

		const options = { ...this.options };

		//Align texts

		if ( options.align ) {

			const align = options.align.to;
			this.align = align;

			const aligner = new StringAligner(
				[ options.from, options.to ],
				align,
				options.align.fill
			);
			const output = aligner.output;
			options.from = output[ 0 ];
			options.to = output[ 1 ];

		}

		//Build textform

		const textform = new this.mode( options );
		this.textform = textform;

		//Autoplay

		const { autoplay } = this;
		if ( ! autoplay ) return;
		const convertSpeedToDuration = () => {

			const speed = Math.abs( autoplay.speed ) || 1;
			return textform.finalFrame * ( 1000 / speed );

		};

		autoplay.textform = textform;
		if ( ! autoplay.duration ) autoplay.duration = convertSpeedToDuration();

		this.player = new TextformPlayer( autoplay );
		this.play();

	}

	destroy() {

		delete this.textform;
		this.stop();
		delete this.player;
		//Remove Event Listeners

	}

	/*-------------------------------------------------------------------------/

		Playback

	/-------------------------------------------------------------------------*/

	play() {

		if ( this.player ) this.player.play();

	}

	stop() {

		if ( this.player ) this.player.stop();

	}

	replay() {

		this.stop();
		this.play();

	}

	/*-------------------------------------------------------------------------/

		Getters / Setters

	/-------------------------------------------------------------------------*/

	get progress() {

		return this.textform.progress;

	}

	set progress( progress ) {

		this.textform.progress = progress;

	}

	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get text() {

		return this.textform.text;

	}

}

/*-----------------------------------------------------------------------------/

	Static

/-----------------------------------------------------------------------------*/

Textformer.align = StringAligner.to;
Textformer.charsets = Textform.charsets;
Textformer.modes = {
	default: Textform,
	reverse: ReversedTextform,
	expand: ExpandTextform,
	collapse: CollapseTextform,
	shuffle: ShuffledTextform,
};

export { Textformer };
