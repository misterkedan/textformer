import { Textform } from '../core/Textform.js';

class ExpandTextform extends Textform {

	//Override
	compute() {

		const { length, stagger, origin, hasOrigin } = this;

		const center = ( hasOrigin )
			? origin
			: Math.floor( ( length - 1 ) / 2 );

		//To avoid asymetrical animations on auto center + even lengths
		const aboveCenter = ( ! hasOrigin && length % 2 === 0 ) ?
			center + 1 : center;

		return Array.from( { length }, ( _, i ) => {

			const diff = ( i < aboveCenter )
				? center - i
				: i - aboveCenter;

			return this.applyNoise( diff * stagger );

		} );

	}

}

export { ExpandTextform };
