import { Textform } from '../core/Textform.js';

class ReversedTextform extends Textform {

	//Override
	compute() {

		return super.compute().reverse();

	}

}

export { ReversedTextform };
