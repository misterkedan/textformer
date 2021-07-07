import { Textform } from './Textform.js';
import { RandomLinear } from './modes/RandomLinear.js';

class Textformer {

	constructor( {

		texts = [ '', 'textformer' ],
		charset = Textform.charsets.ALL,
		steps = 5,
		stagger = 3,
		loop = false,

		mode = Textformer.modes.linear,
		fps = 10,
		auto = true,

	} = {} ) {

		if ( ! texts || ! Array.isArray( texts ) || typeof ( texts[ 0 ] ) !== 'string'  ) {

			throw new TypeError( 'Parameter "texts" must be an array of strings' );

		}

		const textform = new mode( { texts, charset, steps, stagger, loop } );

		if ( ! auto ) return textform;

		const FRAME_DURATION = 1000 / fps;
		let currentTime = 0;
		let lastTime = 0;
		let delta = 0;
		let diff = 0;

		function animate( time = 0 ) {

			currentTime = time;

			delta = currentTime - lastTime;
			diff = FRAME_DURATION - delta;
			if ( diff <= 0 ) {

				textform.step();
				lastTime = currentTime + diff;

			}

			requestAnimationFrame( animate );

		}

		animate();

	}

}

Textformer.modes = {
	linear: RandomLinear
};

export { Textformer };
