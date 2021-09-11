import { Textform } from './Textform.js';

class RightwardTextform extends Textform {

	//?// Override

	build() {

		const changes = [];

		const length = this.length;
		const from = this.from;
		const to = this.to;
		const steps = this.steps;
		const stagger = this.stagger;

		for ( let i = 0; i < length; i ++ ) {

			const charChanges = [];
			const startFrame = i * stagger;
			const endFrame = startFrame + steps;
			const startChar = from.charAt( i );
			const endChar = to.charAt( i );

			charChanges.push( { frame: startFrame, char: startChar } );

			for ( let frame = startFrame + 1; frame < endFrame; frame ++ ) {

				const char = this.getRandomChar();
				charChanges.push( { frame, char } );

			}

			charChanges.push( { frame: endFrame, char: endChar } );

			changes[ i ] = charChanges;

		}

		this.changes = changes;
		this.totalFrames = ( length - 1 ) * stagger + steps;

	}

}

export { RightwardTextform };
