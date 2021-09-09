class TextformPlayer {

	/**
	 * Utility to animate a Textform.
	 * @constructor
	 * @param { Object }	options
	 * @param { Textform }	options.textform	Textform to animate.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds.
	 * @param { Function }	options.onBegin		Optional callback fired when the animation starts.
	 * @param { Function }	options.onChange	Optional callback fired on each Textform character change.
	 * @param { Function }	options.onComplet	Optional callback fired when the animation ends.
	 */
	constructor( { textform, duration, onBegin, onChange, onComplete } = {} ) {

		Object.assign( this, { textform, duration, onBegin, onChange, onComplete } );

	}

	animate( time = 0 ) {

		const textform = this.textform;
		const onChange = this.onChange;
		const onComplete = this.onComplete;
		const duration = this.duration;

		if ( ! this.time ) this.time = time;

		const elapsed = time - this.time;

		if ( elapsed > duration ) {

			textform.progress = 1;
			if ( onComplete ) onComplete.call();
			return cancelAnimationFrame( this.animationFrame );

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

		this.requestAnimationFrame();

	}

	stop() {

		cancelAnimationFrame( this.animationFrame );

	}

}

export { TextformPlayer };
