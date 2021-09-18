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
		this.isReversed = false;

		this.clock = new AnimationClock(
			this.animate.bind( this ),
			TextformPlayer.FPS_CAP
		);

	}

	animate() {

		const {
			textform, duration, clock, delay, delayDuration,
			isReversed, onBegin, onChange, onComplete,
		} = this;

		if ( delay > 0 ) {

			this.delay -= clock.elapsed;
			return;

		}

		const elapsed = clock.elapsed - delayDuration + delay;
		const rawProgress = elapsed / duration;

		let callback = onComplete;
		let progress = rawProgress;
		let progressCap = 1;

		if ( isReversed ) {

			progressCap = 0;
			callback = onBegin;
			progress = 1 - rawProgress;

		}

		if ( rawProgress >= 1 ) {

			textform.progress = progressCap;
			if ( callback ) callback.call();
			if ( this.yoyo ) this.isReversed = ! isReversed;
			return this.stop();

		}

		const previousFrame = textform.frame;
		textform.progress = progress;
		if ( textform.frame !== previousFrame && onChange ) onChange.call();

	}

	play( reversed = this.isReversed ) {

		const { onBegin, onComplete, textform } = this;

		this.isReversed = reversed;

		if ( textform.progress === 0 || textform.progress === 1 ) {

			if ( reversed && onComplete ) onComplete.call();
			else if ( ! reversed && onBegin ) onBegin.call();
			this.delay = this.delayDuration;

		}

		this.clock.start();

	}

	stop() {

		this.clock.stop();

	}

}

TextformPlayer.FPS_CAP = 60;

export { TextformPlayer };
