import { AnimationClock } from './AnimationClock';
import { basicEasing } from '../utils/basicEasing';

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
	 * @param { Number }  options.reverseSpeed  Speed multiplier for reversed
	 * 											animation.
	 * @param { Number }  options.reverseDelay  Delay before playing the reverse animation.
	 * 											Uses options.delay if unspecified.
	 * @param { Number }	options.repeat		Number of times to repeat
	 * 											the animation after the first
	 * 											iteration. Set to -1 for infinite
	 * 											looping.
	 * @param { Boolean }	options.yoyo		Toggle animation direction when
	 * 											reaching either end.
	 * @param { Function }	options.onBegin		Callback fired on animation start.
	 * @param { Function }	options.onUpdate	Callback fired on every frame.
	 * @param { Function }	options.onChange	Callback fired on text change.
	 * @param { Function }	options.onComplete	Callback fired on animation end.
	*/
	constructor( {
		textform, delay, duration, easing,
		reversed, reverseSpeed, reverseDelay, repeat, yoyo,
		onBegin, onUpdate, onChange, onComplete
	} = {} ) {

		this.clock = new AnimationClock(
			this.animate.bind( this ),
			TextformPlayer.FPS_CAP
		);

		this._progress = 0;
		this._isReversed = reversed;

		if ( ! reverseDelay ) reverseDelay = delay;

		Object.assign( this, {
			textform, delay, duration,
			reverseSpeed, reverseDelay, repeat, isYoyo: yoyo,
			onBegin, onUpdate, onChange, onComplete
		} );

		this.ease = basicEasing[ easing ] || basicEasing.linear;

	}

	animate() {

		const speed = ( this.isReversed ) ? this.reverseSpeed : 1;
		const delay = ( this.isReversed ) ? this.reverseDelay : this.delay;
		const elapsed = this.clock.elapsed * speed - delay;

		if ( elapsed < 0 ) return;

		if ( this.onUpdate ) this.onUpdate.call();

		const progress = elapsed / this.duration;
		this.progress = ( this.isReversed ) ? 1 - progress : progress;

		if ( progress >= 1 ) {

			this.progress = Math.round( this.progress );

			if ( this.isReversed && this.onBegin ) this.onBegin.call();
			else if ( this.onComplete ) this.onComplete.call();

			if ( this.isYoyo ) this.isReversed = ! this.isReversed;

			this.stop();

			if ( this.repeat !== 0 ) this.play( true );
			if ( this.repeat > 0 ) this.repeat --;

		}

	}

	reset() {

		this.textform.progress = ( this.isReversed ) ? 1 : 0;

	}

	play( repeated = false ) {

		if ( this.isPlaying || this.isComplete ) {

			this.stop();

			if ( ! repeated ) {

				this.reset();
				if ( this.isReversed && this.onComplete ) this.onComplete.call();
				else if ( ! this.isReversed && this.onBegin ) this.onBegin.call();

			}

		}

		this.start();

	}

	/*-------------------------------------------------------------------------/

		AnimationClock

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

	setClockFromProgress() {

		this.clock.elapsed = ( this.isReversed )
			? ( this.delay + ( 1 - this.progress ) * this.duration )
				/ this.reverseSpeed
			: this.delay + this.progress * this.duration;

	}

	/*-------------------------------------------------------------------------/

		Getters / Setters

	/-------------------------------------------------------------------------*/

	get frame() {

		return this.textform.frame;

	}

	get progress() {

		return this._progress;

	}

	set progress( progress ) {

		if ( progress < 0 ) progress = 0;
		else if ( progress > 1 ) progress = 1;

		this._progress = progress;

		if ( ! this.isPlaying ) this.setClockFromProgress();

		const previousFrame = this.textform.frame;
		this.textform.progress = this.ease( progress );
		if ( this.textform.frame !== previousFrame && this.onChange )
			this.onChange.call();

	}

	get isReversed() {

		return this._isReversed;

	}

	set isReversed( isReversed ) {

		if ( isReversed === this._isReversed ) return;
		this._isReversed = isReversed;
		this.setClockFromProgress();

	}

	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get isPlaying() {

		return this.clock.isPlaying;

	}

	get isComplete() {

		return ( this.isYoyo )
			? ( this.isReversed ) ? this.progress >= 1 : this.progress <= 0
			: ( this.isReversed ) ? this.progress <= 0 : this.progress >= 1;

	}

}

TextformPlayer.FPS_CAP = 60;

export { TextformPlayer };
