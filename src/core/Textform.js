import { random } from '../utils/random';

class Textform {

	/**
	 * Text transform between two texts, using multiple character changes to transition from one to the other.
	 *
	 * @constructor
	 * @param { Object } 	options
	 *
	 * @param { String } 	options.from		Initial text.
	 * @param { String } 	options.to			Final text.
	 *
	 * @param { Number } 	options.steps		Number of character changes between both texts.
	 * @param { Number } 	options.stagger		Stagger ( in steps ) between different
	 * 											characters.
	 * @param { Number } 	options.noise		Maximum random noise for steps and staggers.
	 *
	 * @param { String } 	options.charset		Concatenated character pool for random
	 * 											character changes.
	 * @param { Number } 	options.origin		Character index the animation starts from.
	 * @param { Element }	options.output		DOM element the text will be output to.
	 */
	constructor( options = {
		// from, to,
		// steps, stagger, noise,
		// charset, origin, output
	} ) {

		Object.assign( this, options );

		const { from, to } = this;
		this.length = Math.max( from.length, to.length );

		if ( this.output ) this.output.textform = this;

		this.build();
		this.reset();

	}

	/*-----------------------------------------------------------------------------/

		Init

	/-----------------------------------------------------------------------------*/

	/**
	 * Builds a scenario array to prepare all character changes
	 *
	 * Contains one Array for each character of the text, which itself contains
	 * Objects describing character changes using the structure { frame, char }
	 * for each step of each character.
	 *
	 * Example :
	 * [
	 * 		[{frame:1, char:"H"}, {frame:3, char:"Z"}],
	 * 		[{frame:5, char:"N"}],
	 * ]
	 * The first character will change to "H" on frame 1, and to "Z" on frame 3.
	 * The second character will change to "N" on frame 5.
	 */
	build() {

		const { length, from, to } = this;
		const startFrames = this.computeStartFrames();

		const buildCharAt = ( i ) => {

			const startChar = from.charAt( i );
			const endChar = to.charAt( i );

			// Avoid tabs and returns, looks very messy on multilines
			const isFormatting = ( char ) => char.match( /\r|\n|\t/ );
			if ( isFormatting( startChar ) )
				return [ { frame: 0, char: startChar } ];
			if ( isFormatting( endChar ) )
				return [ { frame: 0, char: endChar } ];

			const steps = this.applyNoise( this.steps );
			const startFrame = startFrames[ i ];
			const endFrame = startFrame + steps;
			const buildStep = ( step ) => {

				const frame = startFrame + step;
				const char = ( frame === startFrame )
					? startChar
					: ( frame === endFrame ) ? endChar
						: random.char( this.charset );
				return { frame, char };

			};

			return Array.from(
				{ length: steps + 1 },
				( _, step ) => buildStep( step )
			);

		};

		const scenario = Array.from( { length }, ( _, i ) => buildCharAt( i ) );
		this.finalFrame = scenario
			.flat()
			.reduce( ( a, b ) => Math.max( a, b.frame ), 0 );
		this.scenario = scenario;

	}

	/**
	 * Method used by the build() method to generate an array of staggered
	 * starting frames. The default behavior is staggering rightward.
	 *
	 * Override this method in subclasses to change the animation.
	 *
	 * @returns { Array } Array of staggered starting frames
	 */
	computeStartFrames() {

		const { length, stagger, origin } = this;

		if ( origin ) return Array.from( { length }, ( _, i )=> {

			const offset = i - origin;
			const offsetStartFrame = ( offset >= 0 )
				? offset * stagger
				: ( length + offset ) * stagger;

			return this.applyNoise( offsetStartFrame );

		} );

		return Array.from( { length }, ( _, i ) => {

			const startFrame = i * stagger;
			return this.applyNoise( startFrame );

		} );

	}

	applyNoise( value ) {

		const { noise } = this;

		if ( ! noise ) return value;

		return random.int( value, value + noise );

	}

	/*-----------------------------------------------------------------------------/

		Update

	/-----------------------------------------------------------------------------*/

	getCharAt( i, frame ) {

		const scenario = this.scenario[ i ];

		let change = scenario.filter( change => change.frame === frame )[ 0 ];

		if ( ! change ) {

			const startFrame = scenario[ 0 ].frame;
			const endFrame = scenario[ scenario.length - 1 ].frame;
			const closestFrame = frame > endFrame ? endFrame : startFrame;
			change = scenario.filter( change => change.frame === closestFrame )[ 0 ];

		}

		return change.char;

	}

	reset() {

		this.progress = 0;

	}

	update() {

		const { frame, length, output } = this;

		this.chars = Array.from(
			{ length },
			( _, i ) => this.getCharAt( i, frame )
		);

		this.text = this.chars.join( '' );

		if ( output ) output.update();

	}

	/*-----------------------------------------------------------------------------/

		Getters / Setters

	/-----------------------------------------------------------------------------*/

	get frame() {

		return this._frame;

	}

	set frame( frame ) {

		if ( frame === this._frame ) return;
		this._frame = frame;
		this.update();

	}

	get progress() {

		return this._progress;

	}

	set progress( progress ) {

		this._progress = progress;
		this.frame = Math.round( this.finalFrame * progress );

	}

	/*-----------------------------------------------------------------------------/

		Read-only

	/-----------------------------------------------------------------------------*/

	get hasValidOrigin() {

		const { origin, length } = this;

		return ( origin !== undefined && origin >= 0 && origin < length );

	}

}

export { Textform };
