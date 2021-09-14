import { Textform } from './Textform.js';

class ExpandTextform extends Textform {

	//?// Override
	computeStartFrames() {

		const { length, stagger, origin, hasValidOrigin } = this;

		const center = ( hasValidOrigin )
			? origin
			: Math.floor( ( length - 1 ) / 2 );

		//?// To avoid asymetrical animations on auto center + even lengths
		if ( ! hasValidOrigin && length % 2 === 0 ) {

			const aboveCenter = center + 1;

			return Array.from( { length } )
				.map( ( _, i ) => {

					const diff = ( i < aboveCenter )
						? center - i
						: i - aboveCenter;

					return diff * stagger;

				} );

		}

		return Array.from( { length } )
			.map( ( _, i ) => Math.abs( center - i ) * stagger );

	}

}

export { ExpandTextform };
