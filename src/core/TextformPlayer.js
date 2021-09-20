import * as KEDA from '../keda';

class TextformPlayer {

	/**
	 * Utility to animate a Textform.
	 *
	 * @constructor
	 * @param { Object }	options
	 * @param { Textform }	options.textform	Textform to animate.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds.
	 * @param { Number } 	options.delay		Delay before playing the animation,
	 * 											in milliseconds.
	 * @param { Boolean }	options.reversed	Play the animation backwards.
	 * @param { Boolean }	options.yoyo		Toggle animation direction when
	 * 											reaching either end.
	 * @param { Number }	option.reverseSpeed Speed multiplier for reversed
	 * 											animation.
	 * @param { Function }	options.onBegin		Callback fired on animation start.
	 * @param { Function }	options.onChange	Callback fired on each text change.
	 * @param { Function }	options.onComplete	Callback fired on animation end.
	*/
	constructor( {
		textform, delay, duration,
		reverseSpeed, reversed, yoyo,
		onBegin, onChange, onComplete
	} = {} ) {

		this.clock = new KEDA.AnimationClock(
			this.animate.bind( this ),
			TextformPlayer.FPS_CAP
		);

		Object.assign( this, {
			textform, delay, duration,
			reverseSpeed, isReversed: reversed, isYoyo: yoyo,
			onBegin, onChange, onComplete
		} );

	}

	animate() {

		const {
			textform, clock, duration, delay, reverseSpeed,
			isReversed, isYoyo, onBegin, onChange, onComplete,
		} = this;

		const speed = isReversed ? reverseSpeed : 1;
		const elapsed = clock.elapsed * speed - delay;

		if ( elapsed < 0 ) return;
		if ( elapsed >= duration ) {

			textform.progress = Math.round( textform.progress );
			if ( isYoyo ) this.isReversed = ! isReversed;
			this.stop();

			if ( isReversed && onBegin ) onBegin.call();
			else if ( onComplete ) onComplete.call();

			return;

		}

		const limit = ( x ) => x < 0 ? 0 : x > 1 ? 1 : x;
		const newProgress = ( isReversed )
			? limit( 1 - elapsed / duration )
			: limit( elapsed / duration );

		const previousFrame = textform.frame;
		textform.progress = newProgress;
		if ( textform.frame !== previousFrame && onChange ) onChange.call();

	}

	reset() {

		const { clock, textform, isReversed } = this;
		clock.reset();
		textform.progress = ( isReversed ) ? 1 : 0;

	}

	play() {

		const {
			onBegin, onComplete,
			isPlaying, isReversed, isComplete
		} = this;

		if ( isPlaying || isComplete ) {

			this.stop();
			this.reset();

			if ( isReversed && onComplete ) onComplete.call();
			else if ( ! isReversed && onBegin ) onBegin.call();

		}

		this.start();

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

	get frame() {

		return this.textform.frame;

	}

	get progress() {

		return this.textform.progress;

	}

	set progress( progress ) {

		this.textform.progress = progress;

		if ( this.isComplete ) return;

		const { clock, duration, reverseSpeed, delay, isReversed } = this;

		clock.elapsed = ( isReversed )
			? ( delay + ( 1 - progress ) * duration ) / reverseSpeed
			: delay + progress * duration;

	}

	get isReversed() {

		return this._isReversed;

	}

	set isReversed( isReversed ) {

		if ( isReversed === this._isReversed ) return;

		this._isReversed = isReversed;

		if ( ! this.isPlaying ) return;
		const { clock, duration, progress, delay, reverseSpeed } = this;
		clock.elapsed = ( isReversed )
			? ( delay + ( 1 - progress ) * duration ) / reverseSpeed
			: delay + progress * duration;

	}

	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get isPlaying() {

		return this.clock.isPlaying;

	}

	get isComplete() {

		const { progress, isReversed } = this;
		return ( isReversed ) ? progress === 0 : progress === 1;

	}

}

TextformPlayer.FPS_CAP = 60;

export { TextformPlayer };
