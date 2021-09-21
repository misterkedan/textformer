import { Textform } from '../core/Textform.js';

class CollapseTextform extends Textform {

	//Override
	compute() {

		const { length, stagger, origin, hasOrigin } = this;

		const center = ( hasOrigin )
			? origin
			: Math.round( ( length - 1 ) / 2 );

		return Array.from( { length }, ( _, i ) => {

			const diff = ( i < center )
				? i
				: length - 1 - i;

			return this.applyNoise( diff * stagger );

		} );

	}

}

export { CollapseTextform };
