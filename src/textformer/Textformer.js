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
		fps = 15,
		auto = true,

	} = {} ) {

		if ( ! texts || ! Array.isArray( texts ) || typeof ( texts[ 0 ] ) !== 'string'  ) {

			throw new TypeError( 'Parameter "texts" must be an array of strings' );

		}

		const options = { texts, charset, steps, stagger };
		Object.assign( this, { mode, options, fps, onBegin, onUpdate, onComplete, auto } );

		this.build();

	}

	build() {

		if ( this.mode.prototype instanceof Textform === false ) throw new Error( 'Please select a mode from Texformer.modes' );
		const textform = new this.mode( this.options );
		this.textform = textform;


		if ( this.auto ) this.autoPlay();

	}

	autoPlay() {

		const onBegin = this.onBegin;

		this.frameDuration = 1000 / this.fps;
		this.time = 0;

		if ( onBegin ) onBegin.call();
		this.animationFrame = requestAnimationFrame( this.animate.bind( this ) );

	}

	animate( time = 0 ) {

		const textform = this.textform;
		const onUpdate = this.onUpdate;
		const onComplete = this.onComplete;

		if ( ! this.time ) this.time = time;

		const delta = time - this.time;
		const diff = this.frameDuration - delta;

		if ( diff <= 0 ) {

			if ( textform.isComplete ) {

				if ( onComplete ) onComplete.call();
				return cancelAnimationFrame( this.animationFrame );

			}

			textform.step();
			if ( onUpdate ) onUpdate.call();
			this.time = time + diff;

		}

		this.animationFrame = requestAnimationFrame( this.animate.bind( this ) );

	}

	replay() {

		cancelAnimationFrame( this.animationFrame );
		this.textform.reset();
		this.autoPlay();

	}

	get text() {

		return this.textform.text;

	}

}

Textformer.modes = {

	linear: RandomLinearTextform

};

export { Textformer };
