class TextformOutput {

	constructor( input ) {

		this.input = input;

	}

	update() {

		if ( ! this.textform ) return;
		const text = this.textform.text;

		if ( this.object ) return this.object.textform = text;

		if ( this.console ) return console.log( text );

		const encodeWhitespaces = string => string.replace( / /g, '&nbsp;' )
			.replace( /\t/g, '&emsp;' )
			.replace( /\n/g, '<br>' );
		const encodedText = encodeWhitespaces( text );

		if ( ! this.elements ) return;

		this.elements.forEach( element => element.innerHTML = encodedText );

	}

	get isValid() {

		return  (
			this.object !== undefined ||
			this.console !== undefined ||
			this.elements !== undefined
		);

	}

	set input( input ) {

		delete this.console;
		delete this.elements;
		delete this.object;

		if ( input === console ) {

			this.console = input;
			return;

		}

		if ( input.innerHTML !== undefined ) {

			this.elements = [ input ];
			return;

		}

		if ( typeof input === 'string' ) {

			const classRegex = /\.\w\S*/;
			if ( input.match( classRegex ) ) {

				const elements =
					document.getElementsByClassName( input.substring( 1 ) );
				if ( elements.length ) this.elements = Array.from( elements );
				return;

			}

			const idRegex = /#\w\S*/;
			if ( input.match( idRegex ) ) {

				const element = document.querySelector( input );
				if ( element ) this.elements = [ element ];
				return;

			}

		}

		try {

			if ( input.textform === undefined ) input.textform = '';
			this.object = input;

		} catch ( error ) {

			return;

		}

	}

}

export { TextformOutput };