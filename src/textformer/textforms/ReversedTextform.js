import { Textform } from './Textform.js';

class ReversedTextform extends Textform {

	//?// Override

	computeStartFrames() {

		return super.computeStartFrames().reverse();

	}

}

export { ReversedTextform };
