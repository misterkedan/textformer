import { Textform } from './Textform.js';

class RandomTextform extends Textform {

	//?// Override

	computeStartFrames() {

		const length = this.length;
		const steps = this.steps;
		const stagger = this.stagger;

		const startFrames = [];

		const GOLDEN_RATIO = 0.382;
		const min = 0;
		const max = GOLDEN_RATIO * length * stagger + steps;
		const randomFrame = () =>
			Math.floor( Math.random() * ( max - min + 1 ) + min );


		for ( let i = 0; i < length; i ++ ) {

			startFrames.push( randomFrame() );

		}

		return startFrames;

	}

}

export { RandomTextform };
