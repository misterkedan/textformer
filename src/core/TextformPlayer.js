import * as KEDA from '../keda/keda';

class TextformPlayer {

	/**
	 * Utility to animate a Textform.
	 * @constructor
	 * @param { Object }	options
	 * @param { Textform }	options.textform	Textform to animate.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds.
	 * @param { Number } 	options.delay		Delay before playing the animation,
	 * 											in milliseconds.
	 *
	 * @param { Boolean }	options.isReversed	Play the animation backwards.
	 * @param { Boolean }	options.isYoyo		Toggle animation direction when
	 * 											reaching either end.
	 *
	 * @param { Function }	options.onBegin		Callback fired on animation start.
	 * @param { Function }	options.onChange	Callback fired on each text change.
	 * @param { Function }	options.onComplete	Callback fired on animation end.
	*/
	constructor( options = {} ) {

		this.clock = new KEDA.AnimationClock(
			this.animate.bind( this ),
			TextformPlayer.FPS_CAP
		);

		Object.assign( this, options );

		this.totalDelay = this.delay;

		return this;

	}

	animate() {

		const {
			textform, duration, clock, delay, totalDelay,
			isReversed, isYoyo, onBegin, onChange, onComplete,
		} = this;

		if ( delay > 0 ) {

			this.delay = totalDelay - clock.elapsed;
			return;

		}

		const elapsed = clock.elapsed - totalDelay + delay;
		const rawProgress = elapsed / duration;

		let callback = onComplete;
		let progressCap = 1;
		let progress = rawProgress;
		let isComplete = ( progress >= progressCap );

		if ( isReversed ) {

			progressCap = 0;
			callback = onBegin;
			progress = 1 - rawProgress;
			isComplete = ( progress <= progressCap );

		}

		if ( isComplete ) {

			textform.progress = progressCap;
			if ( callback ) callback.call();
			if ( isYoyo ) this.isReversed = ! isReversed;
			return this.stop();

		}

		const previousFrame = textform.frame;
		textform.progress = progress;
		if ( textform.frame !== previousFrame && onChange ) onChange.call();

	}

	reset() {

		const { clock, totalDelay, textform, _isReversed: isReversed } = this;
		clock.reset();
		this.delay = totalDelay;
		textform.progress = ( isReversed ) ? 1 : 0;

	}

	play() {

		const {
			clock, onBegin, onComplete,
			isPlaying, isReversed, isComplete
		} = this;

		if ( isPlaying || isComplete ) {

			this.stop();
			this.reset();
			if ( isReversed && onComplete ) onComplete.call();
			else if ( ! isReversed && onBegin ) onBegin.call();

		}

		clock.start();

	}

	/*-------------------------------------------------------------------------/

		AnimationClock shortcuts

	/-------------------------------------------------------------------------*/

	start() {

		this.clock.start();

	}

	pause() {

		this.clock.pause();

	}

	stop() {

		this.clock.stop();

	}

	/*-------------------------------------------------------------------------/

		Getters / Setters

	/-------------------------------------------------------------------------*/

	get progress() {

		return this.textform.progress;

	}

	set progress( progress ) {

		const { clock, duration, totalDelay, delay, _isReversed: isReversed } = this;

		clock.elapsed = ( isReversed )
			? ( 1 - progress ) * duration + totalDelay - delay
			: progress * duration + totalDelay - delay;

		this.textform.progress = progress;

	}

	get isReversed() {

		return this._isReversed;

	}

	set isReversed( isReversed ) {

		if ( isReversed === this._isReversed ) return;

		this._isReversed = isReversed;

		const { clock, duration, delay, totalDelay } = this;

		clock.elapsed = duration - clock.elapsed + 2 * ( totalDelay - delay );

	}

	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get isPlaying() {

		return this.clock.isPlaying;

	}

	get isComplete() {

		const { progress } = this;
		return ( progress === 0 || progress === 1 );

	}

}

TextformPlayer.FPS_CAP = 60;

export { TextformPlayer };
