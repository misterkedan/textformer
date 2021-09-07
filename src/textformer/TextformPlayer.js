import { Textform } from './textforms/Textform';

class TextformPlayer {

	constructor( { textform, fps, onBegin, onUpdate, onComplete } ) {

		Object.assign( this, { textform, fps, onBegin, onUpdate, onComplete } );

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

		this.requestAnimationFrame();

	}

	requestAnimationFrame() {

		this.animationFrame = requestAnimationFrame( this.animate.bind( this ) );

	}

	play() {

		const onBegin = this.onBegin;

		this.frameDuration = 1000 / this.fps;
		this.time = 0;

		if ( onBegin ) onBegin.call();
		this.requestAnimationFrame();

	}

	stop() {

		cancelAnimationFrame( this.animationFrame );

	}

	reset() {

		this.textform.reset();

	}

	replay() {

		this.stop();
		this.reset();
		this.play();

	}

}

export { TextformPlayer };
