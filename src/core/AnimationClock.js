class AnimationClock {

	/**
	 * Fires the specified callback or array of callbacks at a specific FPS rate.
	 * @param { Function|Array[Function] } 	callbacks 	Function
	 * @param {Number}	fps		Frames per second limiter, 0 for uncapped frames
	 */
	constructor( callbacks = null, fps = 0 ) {

		this.callbacks = ( typeof callbacks === 'function' )
			? [ callbacks ] : callbacks;
		this.fps = fps;

		this._time = ( performance === undefined ) ? Date : performance;

		this._elapsed = 0;
		this._previous = 0;
		this._delta = 0;

		this._isPlaying = false;

	}

	start() {

		this._previous = this.now;
		this._delta = 0;
		this._isPlaying = true;
		this.requestAnimationFrame();

	}

	pause() {

		this._isPlaying = false;

	}

	reset() {

		this._elapsed = 0;

	}

	stop() {

		this.pause();
		this.reset();

	}

	update() {

		if ( ! this.isPlaying ) return;

		const current = this.now;
		const delta = current - this._previous;

		this._previous = current;
		this._elapsed += delta;
		this._delta += delta;

		const diff = this._frameDuration - this._delta;
		if ( diff <= 0 ) {

			this.callbacks.forEach( callback => callback.call() );
			this._delta = Math.abs( diff );

		}

		this.requestAnimationFrame();

	}

	requestAnimationFrame() {

		requestAnimationFrame( this.update.bind( this ) );

	}

	/*-------------------------------------------------------------------------/

		Getters/Setters

	/-------------------------------------------------------------------------*/

	get fps() {

		return this._fps;

	}

	set fps( fps ) {

		this._fps = fps;
		this._frameDuration = ( fps > 0 ) ? Math.floor( 1000 / fps ) : 0;

	}

	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get elapsed() {

		return this._elapsed;

	}

	get isPlaying() {

		return this._isPlaying;

	}

	get now() {

		return this._time.now();

	}

}

export { AnimationClock };
