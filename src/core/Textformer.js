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
	 *
	 * @constructor
	 * @param { Object }	options
	 * @param { Class }		options.mode		Animation mode, pick one from Textformer.modes.
     *
	 * @param { String } 	options.from		Initial text.
	 * @param { String } 	options.to			Final text.
	 * @param { Number } 	options.steps		Number of character changes between both texts.
	 * @param { Number } 	options.stagger		Stagger ( in steps ) between different
	 * 											characters.
	 * @param { Number } 	options.noise		Maximum random noise for steps and staggers.
	 * @param { String } 	options.charset		Concatenated character pool for random
	 * 											character changes.
	 * @param { Number } 	options.origin		Character index the animation starts from.
	 * @param { Element } 	options.output		DOM element the text will be output to.
	 * @param { Object }	options.align		Align texts options.
	 * 											Set to false for no alignment.
	 * @param { Function } 	options.align.to	Alignment mode, use one of Textformer.align.
	 * @param { String } 	options.align.fill	String used to pad the shorter text.
	 * @param { Object } 	options.autoplay 			Automatic animation settings.
														Set to false for manual animation
														( change textformer.progress
														from 0 to 1 ).
	 * @param { Number } 	options.autoplay.speed		Number of changes per second.
	 * @param { Number } 	options.autoplay.delay		Delay before playing the animation,
	 * 													in milliseconds.
	 * @param { Number } 	options.autoplay.duration	Animation duration, in milliseconds.
	 * 													Overrides options.speed.
	 * @param { Function }	options.autoplay.onBegin	Callback fired on animation start.
	 * @param { Function }	options.autoplay.onChange	Callback fired on each text change.
	 * @param { Function }	options.autoplay.onComplete	Callback fired on animation end.
	 */
	constructor( {
		mode = Textformer.modes.default,
		align = {
			to: Textformer.align.NONE,
			fill: '',
		},
		autoplay = {
			speed: 15,
			delay: 0,
			// duration, onBegin, onChange, onComplete,
		},
		from = '',
		to = '',
		steps = 5,
		stagger = 3,
		noise = 0,
		origin,
		output,
		charset = Textformer.charsets.ALL,
	} = {} ) {

		Object.assign( this, {
			mode,
			autoplay,
			options: {
				align,
				from, to, steps, stagger, noise, origin, output, charset
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
