import { Textform } from '../core/Textform.js';

class ShuffledTextform extends Textform {

	//?// Override
	computeStartFrames() {

		const { origin, stagger } = this;
		let startFrames = ShuffledTextform.shuffle(
			super.computeStartFrames()
		);

		if ( this.hasValidOrigin && stagger > 0 ) {

			startFrames = startFrames.filter( x => x > 0 );
			startFrames.splice( origin, 0, 0 );
			return startFrames;

		}

		return startFrames;

	}

}

ShuffledTextform.shuffle = ( array ) => {

	let shuffled = [ ...array ];

	//?// Durstenfeld shuffle
	for ( let i = array.length - 1; i > 0; i -- ) {

		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ shuffled[ i ], shuffled[ j ] ] = [ shuffled[ j ], shuffled[ i ] ];

	}

	return shuffled;

};

export { ShuffledTextform };
