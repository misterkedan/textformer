import { Textform } from './Textform.js';

class RandomTextform extends Textform {

	//?// Override

	computeStartFrames() {

		const { length, steps, stagger } = this;

		const generateRandomInt = ( min, max ) =>
			Math.floor( Math.random() * ( max - min + 1 ) + min );

		const GOLDEN_RATIO = 0.382;
		const minFrame = 0;
		const maxFrame = GOLDEN_RATIO * length * stagger + steps;
		const generateRandomFrame = () => generateRandomInt( minFrame, maxFrame );

		return Array.from( { length } ).map( () => generateRandomFrame() );

	}

}

export { RandomTextform };
