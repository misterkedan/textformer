import { Textform } from './textforms/Textform.js';
import { RandomLinearTextform } from './textforms/RandomLinearTextform.js';

//?// This is both a textform factory and barebones animation system

class Textformer {

	constructor( {

		texts = [ '', 'textformer' ],
		charset = Textform.charsets.ALL,
		steps = 5,
		stagger = 3,

		mode = Textformer.modes.linear,
		fps = 15,
		auto = true,

	} = {} ) {

		if ( ! texts || ! Array.isArray( texts ) || typeof ( texts[ 0 ] ) !== 'string'  ) {

			throw new TypeError( 'Parameter "texts" must be an array of strings' );

		}

		if ( mode.prototype instanceof Textform === false ) throw new Error( 'Please select a mode from Texformer.modes' );
		const textform = new mode( { texts, charset, steps, stagger } );
		this.textform = textform;

		this.fps = fps;

		if ( auto ) this.autoPlay();

	}

	autoPlay() {

		const textform = this.textform;
		const FRAME_DURATION = 1000 / this.fps;

		let currentTime = 0;
		let lastTime = 0;
		let delta = 0;
		let diff = 0;

		function animate( time = 0 ) {

			const nextFrame = requestAnimationFrame( animate );

			currentTime = time;
			delta = currentTime - lastTime;
			diff = FRAME_DURATION - delta;

			if ( diff <= 0 ) {

				if ( textform.isComplete ) return cancelAnimationFrame( nextFrame );

				textform.step();
				console.log( textform.text );
				lastTime = currentTime + diff;

			}

		}

		requestAnimationFrame( animate );

	}

}

Textformer.modes = {

	linear: RandomLinearTextform

};

export { Textformer };
