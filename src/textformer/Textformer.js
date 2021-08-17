import { Textform } from './Textform.js';
import { RandomLinear } from './modes/RandomLinear.js';

//?// This is both a textform factory and barebones animation system

class Textformer {

	constructor( {

		texts = [ '', 'textformer' ],
		charset = Textform.charsets.ALL,
		steps = 5,
		stagger = 3,
		loop = false,

		mode = Textformer.modes.linear,
		fps = 15,
		auto = true,

	} = {} ) {

		if ( ! texts || ! Array.isArray( texts ) || typeof ( texts[ 0 ] ) !== 'string'  ) {

			throw new TypeError( 'Parameter "texts" must be an array of strings' );

		}

		const textform = new mode( { texts, charset, steps, stagger, loop } );
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

			currentTime = time;
			delta = currentTime - lastTime;
			diff = FRAME_DURATION - delta;

			if ( diff <= 0 ) {

				textform.step();
				console.log( textform.text );
				lastTime = currentTime + diff;

			}

			if ( ! textform.complete ) requestAnimationFrame( animate );

		}

		animate();

	}

}

Textformer.modes = {
	linear: RandomLinear
};

export { Textformer };
