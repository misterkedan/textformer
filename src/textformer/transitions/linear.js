function linear( textformer ) {

	const result = [];

	const texts = textformer.texts;

	const stagger = textformer.stagger;
	const steps = textformer.steps;
	const maxLength = textformer.maxLength;

	const endText = texts.length - 1;

	for ( let text = 0; text < endText; text ++ ) {

		const startText = texts[ text ];
		const endText = texts[ text + 1 ] || texts[ endText ];

		for ( let i = 0; i < maxLength; i ++ ) {

			const startFrame = i * stagger;
			const endFrame = startFrame + steps;
			const startChar = startText.charAt( i );
			const endChar = endText.charAt( i );

			for ( let frame = startFrame; frame <= endFrame; frame ++ ) {

				if ( ! result[ frame ] ) result[ frame ] = [];

				const step = frame - startFrame;

				const char = ( step === steps )
					? endChar
					: ( step === 0 )
						? startChar
						: textformer.getRandomChar();

				result[ frame ].push( { i, char } );

			}

		}

	}

	return result;

}

export { linear };
