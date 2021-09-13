class TextformPlayer {

	/**
	 * Utility to animate a Textform.
	 * @constructor
	 * @param { Object }	options
	 * @param { Textform }	options.textform	Textform to animate.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds.
	 * @param { Number } 	options.delay		Delay before playing the animation, in milliseconds.
	 * @param { Function }	options.onBegin		Optional callback fired when the animation starts.
	 * @param { Function }	options.onChange	Optional callback fired on each Textform character change.
	 * @param { Function }	options.onComplet	Optional callback fired when the animation ends.
	 */
	constructor( options = {} ) {

		Object.assign( this, options );

	}

	animate( animationTime = 0 ) {

		if ( ! this.time && animationTime ) this.time = animationTime;

		const { textform, onChange, onComplete, duration, time } = this;

		const elapsed = animationTime - time;

		if ( elapsed > duration ) {

			textform.progress = 1;
			if ( onComplete ) onComplete.call();
			return this.stop();

		}

		const previousFrame = textform.frame;
		textform.progress = elapsed / duration;

		if ( textform.frame !== previousFrame && onChange ) onChange.call();

		this.requestAnimationFrame();

	}

	requestAnimationFrame() {

		this.animationFrame = requestAnimationFrame( this.animate.bind( this ) );

	}

	play() {

		const onBegin = this.onBegin;
		if ( onBegin ) onBegin.call();

		this.time = 0;
		this.textform.progress = 0;

		const delay = ( this.delay > 0 ) ? this.delay : 0;
		this.timeout = setTimeout( this.requestAnimationFrame.bind( this ), delay );

	}

	stop() {

		clearTimeout( this.timeout );
		cancelAnimationFrame( this.animationFrame );

	}

}

export { TextformPlayer };
