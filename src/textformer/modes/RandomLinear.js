import { Textform } from '../Textform.js';

class RandomLinear extends Textform {

	constructor( options = {} ) {

		super( options );

	}

	build() {

		const frames = [];
		const texts = this.texts;
		const lastText = texts.length - 1;

		for ( let text = 0; text < lastText; text ++ ) {

			const startText = texts[ text ];
			const endText = texts[ text + 1 ] || texts[ endText ];

			for ( let i = 0, l = this.maxLength; i < l; i ++ ) {

				const startFrame = i * this.stagger;
				const endFrame = startFrame + this.steps;
				const startChar = startText.charAt( i );
				const endChar = endText.charAt( i );

				for ( let frame = startFrame; frame <= endFrame; frame ++ ) {

					if ( ! frames[ frame ] ) frames[ frame ] = [];

					const step = frame - startFrame;

					const char = ( step === this.steps )
						? endChar
						: ( step === 0 )
							? startChar
							: this.getRandomChar();

					frames[ frame ].push( { i, char } );

				}

			}

		}

		this.frames = frames;

	}

}

export { RandomLinear };
