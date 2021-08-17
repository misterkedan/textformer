import { Textform } from './textforms/Textform.js';
import { RandomLinearTextform } from './textforms/RandomLinearTextform.js';

//?// This is both a textform factory and barebones animation system

class Textformer {

	constructor( {

		texts = [ '', 'Textformer' ],
		charset = Textform.charsets.ALL,
		steps = 5,
		stagger = 3,

		onBegin = null,
		onUpdate = null,
		onComplete = null,

		mode = Textformer.modes.linear,
		fps = 30,
		auto = true,

	} = {} ) {

		if ( ! texts || ! Array.isArray( texts ) || typeof ( texts[ 0 ] ) !== 'string'  ) {

			throw new TypeError( 'Parameter "texts" must be an array of strings' );

		}

		if ( mode.prototype instanceof Textform === false ) throw new Error( 'Please select a mode from Texformer.modes' );
		const textform = new mode( { texts, charset, steps, stagger } );
		this.textform = textform;

		Object.assign( this, { fps, onBegin, onUpdate, onComplete } );

		if ( auto ) this.autoPlay();

	}

	autoPlay() {

		const textform = this.textform;
		const onBegin = this.onBegin;
		const onUpdate = this.onUpdate;
		const onComplete = this.onComplete;

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

				if ( textform.isComplete ) {

					if ( onComplete ) onComplete.call();
					return cancelAnimationFrame( nextFrame );

				}

				textform.step();
				if ( onUpdate ) onUpdate.call();
				lastTime = currentTime + diff;

			}

		}

		if ( onBegin ) onBegin.call();
		requestAnimationFrame( animate );

	}

	get text() {

		return this.textform.text;

	}

}

Textformer.modes = {

	linear: RandomLinearTextform

};

export { Textformer };
