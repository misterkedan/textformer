class TextformOutput {

	/**
	 * Creates an output to display a Textform's current text.
	 *
	 * @param { Console | String | HTMLElement | Object } input
	 * Can be the console, an id or class identifier, a selected HTMLElement,
	 * a writeable object ( text will be written in its property "textform" ).
	 */
	constructor( input ) {

		this.input = input;

	}

	update() {

		if ( ! this.textform ) return;
		const text = this.textform.text;

		if ( this.object ) return this.object.textform = text;

		if ( this.console ) return console.log( text );

		if ( ! this.elements ) return;

		const escapeHTML = ( string ) => string.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
			.replace( /"/g, '&quot;' )
			.replace( /'/g, '&#039;' );

		const convertToHTML = ( string ) => {

			const SPACE = ' ';
			const chars = [];

			for ( let i = 0; i < string.length; i ++ ) {

				// Attempt to keep the same breaking spaces structure,
				// to prevent linebreak/whitespace related glitches.
				if ( this?.referenceText.charAt( i ) === SPACE ) chars.push( SPACE );
				else if ( text.charAt( i ) === SPACE ) chars.push( '&numsp;' );
				else chars.push( escapeHTML( text.charAt( i ) ) );

			}

			return chars.join( '' )
				.replace( /\t/g, '&emsp;' )
				.replace( /\n/g, '<br>' );

		};

		const innerHTML = convertToHTML( text );

		this.elements.forEach( element => element.innerHTML = innerHTML );

	}

	/*-------------------------------------------------------------------------/

		Getters / Setters

	/-------------------------------------------------------------------------*/

	get input() {

		return this._input;

	}

	set input( input ) {

		this.console = null;
		this.elements = null;
		this.object = null;

		if ( input === undefined ) return;

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

	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get isValid() {

		return  (
			this.object !== undefined ||
			this.console !== undefined ||
			this.elements !== undefined
		);

	}

	get inputText() {

		if ( this.object && this.object.textform ) return this.object.textform;
		if ( this.elements ) return this.elements[ 0 ].textContent;
		return undefined;

	}

}

export { TextformOutput };
