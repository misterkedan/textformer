import { Textform } from './Textform.js';

class RandomTextform extends Textform {

	//?// Override
	build() {

		const { length, from, to, steps } = this;
		const startFrames = this.computeStartFrames();

		const buildCharAt = ( i ) => {

			//?// * = Overriden
			const randomSteps = RandomTextform.generateRandomInt( 1, steps );

			const startFrame = startFrames[ i ];
			const endFrame = startFrame + randomSteps; //?// *
			const startChar = from.charAt( i );
			const endChar = to.charAt( i );

			const buildStep = ( step ) => {

				const frame = startFrame + step;
				const char = ( frame === startFrame ) ? startChar
					: ( frame === endFrame ) ? endChar
						: this.generateRandomChar();
				return { frame, char };

			};

			return Array.from( { length: randomSteps + 1 } ) //?// *
				.map( ( _, step ) => buildStep( step ) );

		};

		const scenario = Array.from( { length } )
			.map( ( _, i ) => buildCharAt( i ) );
		this.scenario = scenario;

		this.totalFrames = Math.max.apply(
			Math,
			scenario.map( ( char ) => char.map( change => change.frame ) )
				.flat()
		);

	}

	//?// Override
	computeStartFrames() {

		const { length, steps, stagger, origin, hasValidOrigin } = this;

		const GOLDEN_RATIO = 0.382;
		const minFrame = hasValidOrigin;
		const maxFrame = GOLDEN_RATIO * length * stagger + steps;
		const generateRandomFrame = () =>
			RandomTextform.generateRandomInt( minFrame, maxFrame );

		let randomStartFrames = Array.from( { length } ).map( () => generateRandomFrame() );
		if ( hasValidOrigin ) randomStartFrames.splice( origin, 1, 0 );

		return randomStartFrames;

	}

}

RandomTextform.generateRandomInt = ( min, max ) =>
	Math.floor( Math.random() * ( max - min + 1 ) + min );

export { RandomTextform };
