import { Textform } from './Textform.js';

class ShuffledTextform extends Textform {

	//?// Override

	computeStartFrames() {

		const startFrames = super.computeStartFrames();
		ShuffledTextform.shuffle( startFrames );
		return startFrames;

	}

}

ShuffledTextform.shuffle = ( array ) => {

	//?// Durstenfeld shuffle algorithm

	for ( let i = array.length - 1; i > 0; i -- ) {

		let j = Math.floor( Math.random() * ( i + 1 ) );
		[ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];

	}

};

export { ShuffledTextform };
