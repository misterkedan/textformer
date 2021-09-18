import { Textform } from './Textform';
import { TextformPlayer } from './TextformPlayer';
import { ReversedTextform } from '../modes/ReversedTextform';
import { ExpandTextform } from '../modes/ExpandTextform';
import { CollapseTextform } from '../modes/CollapseTextform';
import { ShuffledTextform } from '../modes/ShuffledTextform';
import { align } from '../utils/align';
import { charsets } from '../utils/charsets';
import { TextformOutput } from './TextformOutput';

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
	 * @param { Boolean }	options.autoplay.isReversed	Play the animation backwards.
	 * @param { Boolean }	options.autoplay.isYoyo		Toggle animation direction when
	 * 													reaching either end.
	 * @param { Function }	options.autoplay.onBegin	Callback fired on animation start.
	 * @param { Function }	options.autoplay.onChange	Callback fired on each text change.
	 * @param { Function }	options.autoplay.onComplete	Callback fired on animation end.
	 */
	constructor( {
		mode = Textformer.modes.BASIC,
		align = {
			to: Textformer.align.NONE,
			fill: '',
		},
		autoplay = {
			speed: Textformer.DEFAULT_SPEED,
			delay: 0,
			isReversed: false,
			isYoyo: false,
			// duration, onBegin, onChange, onComplete,
		},
		from,
		to,
		steps = 5,
		stagger = 3,
		noise = 0,
		charset = Textformer.charsets.ALL,
		origin,
		output,
	} = {} ) {

		this._build( {
			mode, align, autoplay,
			from, to, steps, stagger, noise, charset, origin, output
		} );

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

	/*-------------------------------------------------------------------------/

		Private

	/-------------------------------------------------------------------------*/

	_build( options = this.options ) {

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
		const textform = new TextformClass( this._computeOptions() );
		this.textform = textform;

		this._autoplay( options.autoplay );

	}

	_computeOptions() {

		const options =  { ...this.options };
		const { DEFAULT_TEXT } = Textformer;

		const output = new TextformOutput( options.output );
		if ( output.isValid ) {

			options.output = output;
			//If valid output, uses output's initial text as automatic to/from
			const initialText =  ( output.elements && output.elements.length === 1 )
				? output.elements[ 0 ].textContent
				: ( output.object )
					? output.object.textform
					: DEFAULT_TEXT;
			if ( options.to === undefined ) options.to = initialText;
			else if ( options.from === undefined ) options.from = initialText;

		} else delete options.output;

		if ( options.from === undefined ) options.from = DEFAULT_TEXT;
		if ( options.to === undefined ) options.to = DEFAULT_TEXT;

		if ( options.align ) {

			const alignedTexts = align.strings(
				[ options.from, options.to ],
				options.align.to,
				options.align.fill
			);
			options.from = alignedTexts[ 0 ];
			options.to = alignedTexts[ 1 ];

		}

		return options;

	}

	_autoplay( options ) {

		if ( ! options ) return;

		options.textform = this.textform;
		if ( ! options.duration ) this.speed = options.speed;
		this.player = new TextformPlayer( options );
		this.play();

	}

	/*-------------------------------------------------------------------------/

		Player shorthands

	/-------------------------------------------------------------------------*/

	play() {

		if ( this.player ) this.player.play();

	}

	stop() {

		if ( this.player ) this.player.stop();

	}

	pause() {

		if ( this.player ) this.player.pause();

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

		return this.options.autoplay.speed;

	}

	set speed( speed ) {

		if ( speed < 1 ) speed = Textformer.DEFAULT_SPEED;
		this.options.autoplay.speed = speed;

		if ( ! this.textform ) return;
		const finalFrame = this.textform.finalFrame;
		this.options.autoplay.duration = finalFrame * ( 1000 / speed );

	}

	get align() {

		return this.options.align.to;

	}

	set align( align ) {

		this.options.align.to = align;

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

Textformer.align = align.to;

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

export { Textformer };
