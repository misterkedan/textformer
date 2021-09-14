import { Textform } from './Textform.js';

class ExpandTextform extends Textform {

	//?// Override
	computeStartFrames() {

		const { length, stagger, origin, hasValidOrigin } = this;

		const center = ( hasValidOrigin )
			? origin
			: Math.floor( ( length - 1 ) / 2 );

		//?// To avoid asymetrical animations on auto center + even lengths
		const aboveCenter = ( ! hasValidOrigin && length % 2 === 0 ) ?
			center + 1 : center;

		return Array.from( { length } )
			.map( ( _, i ) => {

				const diff = ( i < aboveCenter )
					? center - i
					: i - aboveCenter;

				return this.randomize( diff * stagger );

			} );

	}

}

export { ExpandTextform };
