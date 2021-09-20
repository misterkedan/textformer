import { Textform } from './Textform';
import { TextformPlayer } from './TextformPlayer';
import { ReversedTextform } from '../modes/ReversedTextform';
import { ExpandTextform } from '../modes/ExpandTextform';
import { CollapseTextform } from '../modes/CollapseTextform';
import { ShuffledTextform } from '../modes/ShuffledTextform';
import { stringAlign } from '../utils/stingAlign';
import { charsets } from '../utils/charsets';
import { TextformOutput } from './TextformOutput';

class Textformer {

	/**
	 * Easy text animations with random character changes.
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
	 * @param { TextformOutput } options.output	Automatic text output.

	 * @param { String | Number } options.align	A position to align both text at,
												padding the shorter text to match
												the longer's text's length.
	 * 											Either pick one from Textformer.align,
	 * 											or specify an index to align at.
	 * 											Invalid values will default to 0.
	 * @param { String } 	options.fill		String used for align padding.
	 *
	 * @param { Boolean } 	options.autoplay 	Automatic animation settings.
												Set to false for manual animation
												( change textformer.progress
												from 0 to 1 ).
	 * @param { Number } 	options.speed		Number of changes per second.
	 * @param { Number } 	options.delay		Delay before playing the animation,
	 * 											in milliseconds.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds.
	 * 											Overrides options.speed.
	 * @param { Boolean }	options.reversed	Play the animation backwards.
	 * @param { Boolean }	options.yoyo		Toggle animation direction when
	 * 											reaching either end.
	 * @param { Number } 	option.reverseSpeed Speed multiplier for reversed
	 * 											animation.
	 * @param { Function }	options.onBegin		Callback fired on animation start.
	 * @param { Function }	options.onChange	Callback fired on each text change.
	 * @param { Function }	options.onComplete	Callback fired on animation end.
	 */
	constructor( {

		mode = Textformer.modes.BASIC,

		//Textform
		from, to,
		steps = 5,
		stagger = 3,
		noise = 0,
		charset = Textformer.charsets.ALL,
		origin, output,

		//Align
		align = Textformer.align.NONE,
		fill = ' ',

		//Player
		autoplay = true,
		speed = Textformer.DEFAULT_SPEED,
		delay = 0,
		duration,
		reverseSpeed = 1,
		reversed = false,
		yoyo = false,
		onBegin,
		onChange,
		onComplete,

	} = {} ) {

		this.build( {

			mode,

			//Textform
			from, to, steps, stagger, noise, charset, origin, output,

			//Align
			align, fill,

			//Player
			autoplay, speed, delay,
			duration, reverseSpeed, reversed, yoyo,
			onBegin, onChange, onComplete,

		} );

	}

	build( options = this.options ) {

		this.options = options;

		this.destroy();

		const textformClasses = {
			default: 	Textform,
			basic: 		Textform,
			reverse: 	ReversedTextform,
			expand: 	ExpandTextform,
			collapse: 	CollapseTextform,
			shuffle: 	ShuffledTextform,
		};
		const TextformClass = textformClasses[ options.mode ]
			|| textformClasses.default;
		const textform = new TextformClass( this.textformOptions );
		this.textform = textform;

		if ( ! options.autoplay ) return;
		this.player = new TextformPlayer( this.autoplayOptions );
		this.play();

	}

	clone( overrides = { output: undefined } ) {

		const options = { ...this.options, ...overrides };
		return new Textformer( options );

	}

	destroy() {

		this.stop();
		delete this.player;
		delete this.textform;
		//Remove event listeners

	}

	convertSpeedToDuration( speed ) {

		if ( ! this.textform ) return Textformer.DEFAULT_DURATION;
		const finalFrame = this.textform.finalFrame;
		return finalFrame * ( 1000 / speed );

	}

	/*-------------------------------------------------------------------------/

		Player shorthands

	/-------------------------------------------------------------------------*/

	play() {

		if ( this.player ) this.player.play();

	}

	pause() {

		if ( this.player ) this.player.pause();

	}

	stop() {

		if ( this.player ) this.player.stop();

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

	get speed() {

		return this.options.speed;

	}

	set speed( speed ) {

		if ( speed < 1 ) speed = Textformer.DEFAULT_SPEED;
		this.options.speed = speed;
		this.options.duration = this.convertSpeedToDuration( speed );

	}

	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get text() {

		return this.textform.text;

	}

	get textformOptions() {

		const { DEFAULT_TEXT } = Textformer;

		const options =  { ...this.options };
		const { from, to, align, fill } = options;

		const output = new TextformOutput( options.output );
		if ( output.isValid ) {

			options.output = output;
			//If valid output, uses output's initial text as automatic to/from
			const initialText = output.inputText || DEFAULT_TEXT;
			if ( from === undefined ) options.from = initialText;
			if ( to === undefined ) options.to = initialText;

		} else delete options.output;

		if ( from === undefined ) options.from = DEFAULT_TEXT;
		if ( to === undefined ) options.to = DEFAULT_TEXT;

		if ( align ) {

			const alignedTexts = stringAlign
				.align( [ options.from, options.to ], align, fill );
			options.from = alignedTexts[ 0 ];
			options.to = alignedTexts[ 1 ];

		}

		return options;

	}

	get autoplayOptions() {

		const { textform } = this;
		const { autoplay } = this.options;

		if ( ! autoplay ) return false;

		const options = { ...this.options, textform };

		if ( ! options.duration )
			options.duration = this.convertSpeedToDuration( options.speed );

		return options;

	}

}

/*-----------------------------------------------------------------------------/

	Static

/-----------------------------------------------------------------------------*/

Textformer.align = stringAlign.to;

Textformer.charsets = charsets;

Textformer.modes = {
	BASIC: 		'basic',
	REVERSE: 	'reverse',
	EXPAND: 	'expand',
	COLLAPSE: 	'collapse',
	SHUFFLE: 	'shuffle',
};

Textformer.DEFAULT_TEXT = '';
Textformer.DEFAULT_SPEED = 15;
Textformer.DEFAULT_DURATION = 1000;

export { Textformer };
