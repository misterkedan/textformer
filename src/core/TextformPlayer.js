import { AnimationClock } from './AnimationClock';

class TextformPlayer {

	/**
	 * Utility to animate a Textform.
	 * @constructor
	 * @param { Object }	options
	 * @param { Textform }	options.textform	Textform to animate.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds.
	 * @param { Number } 	options.delay		Delay before playing the animation,
	 * 											in milliseconds..
	 * @param { Function }	options.onBegin		Callback fired on animation start.
	 * @param { Function }	options.onChange	Callback fired on each text change.
	 * @param { Function }	options.onComplete	Callback fired on animation end.
	*/
	constructor( options = {} ) {

		Object.assign( this, options );

		this.delayDuration = this.delay;

		this.clock = new AnimationClock(
			this.animate.bind( this ),
			TextformPlayer.FPS_CAP
		);

	}

	animate() {

		const {
			textform, duration, clock, delay, delayDuration,
			onChange, onComplete,
		} = this;

		if ( delay > 0 ) {

			this.delay -= clock.elapsed;
			return;

		}

		const elapsed = clock.elapsed - delayDuration + delay;

		if ( elapsed >= duration ) {

			textform.progress = 1;
			if ( onComplete ) onComplete.call();
			return this.stop();

		}

		const previousFrame = textform.frame;
		textform.progress = elapsed / duration;
		if ( textform.frame !== previousFrame && onChange ) onChange.call();

	}

	play() {

		const { onBegin, textform } = this;
		if ( onBegin && textform.progress === 0 ) onBegin.call();

		this.delay = this.delayDuration;

		this.clock.start();

	}

	stop() {

		this.clock.stop();

	}

}

TextformPlayer.FPS_CAP = 60;

export { TextformPlayer };
