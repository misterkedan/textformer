import { Textform } from '../core/Textform.js';

class CollapseTextform extends Textform {

	//?// Override
	computeStartFrames() {

		const { length, stagger, origin, hasValidOrigin } = this;

		const center = ( hasValidOrigin )
			? origin
			: Math.round( ( length - 1 ) / 2 );

		return Array.from( { length }, ( _, i ) => {

			const diff = ( i < center )
				? i
				: length - 1 - i;

			return this.randomize( diff * stagger );

		} );

	}

}

export { CollapseTextform };
