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
		reversed, reverseSpeed, repeat, yoyo,
		onBegin, onUpdate, onChange, onComplete
	} = {} ) {

		this.clock = new AnimationClock(
			this.animate.bind( this ),
			TextformPlayer.FPS_CAP
		);

		this._progress = 0;
		this._isReversed = reversed;

		Object.assign( this, {
			textform, delay, duration,
			reverseSpeed, repeat, isYoyo: yoyo,
			onBegin, onUpdate, onChange, onComplete
		} );

		this.ease = basicEasing[ easing ] || basicEasing.linear;

	}

	animate() {

		const {
			clock, duration, delay,
			reverseSpeed, isReversed, isYoyo,
			onBegin, onUpdate, onComplete,
		} = this;

		const speed = isReversed ? reverseSpeed : 1;
		const elapsed = clock.elapsed * speed - delay;

		if ( onUpdate ) onUpdate.call();

		if ( elapsed < 0 ) return;
		if ( elapsed >= duration ) {

			this.progress = Math.round( this.progress );
			if ( isYoyo ) this.isReversed = ! isReversed;
			this.stop();

			if ( isReversed && onBegin ) onBegin.call();
			else if ( onComplete ) onComplete.call();

			if ( this.repeat !== 0 ) this.play( true );
			if ( this.repeat > 0 ) this.repeat --;

			return;

		}

		const progress = elapsed / duration;
		this.progress = ( isReversed ) ? 1 - progress : progress;

	}

	reset() {

		const { textform, isReversed } = this;
		textform.progress = ( isReversed ) ? 1 : 0;

	}

	play( repeated = false ) {

		const {
			onBegin, onComplete,
			isPlaying, isReversed, isComplete
		} = this;

		if ( isPlaying || isComplete ) {

			this.stop();
			if ( ! repeated ) this.reset();

			if ( isReversed && onComplete ) onComplete.call();
			else if ( ! isReversed && onBegin ) onBegin.call();

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

		const { clock, progress, duration, reverseSpeed, delay, isReversed } = this;

		clock.elapsed = ( isReversed )
			? ( delay + ( 1 - progress ) * duration ) / reverseSpeed
			: delay + progress * duration;

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

		const { textform, ease, onChange } = this;

		if ( progress < 0 ) progress = 0;
		else if ( progress > 1 ) progress = 1;

		this._progress = progress;

		if ( ! this.isPlaying ) this.setClockFromProgress();

		const previousFrame = textform.frame;
		textform.progress = ease( progress );
		if ( textform.frame !== previousFrame && onChange ) onChange.call();

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

		const { progress, isReversed, isYoyo } = this;
		return ( isYoyo )
			? ( isReversed ) ? progress >= 1 : progress <= 0
			: ( isReversed ) ? progress <= 0 : progress >= 1;

	}

}

TextformPlayer.FPS_CAP = 60;

export { TextformPlayer };
