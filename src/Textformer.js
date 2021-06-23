class Textformer {

	constructor( {
		texts = [],
		charset = Textformer.charsets.ALL,
		mode = Textformer.modes.LINEAR,
		steps = 5,
		stagger = 1,
	} = {} ) {

		this.params = { texts, charset, mode, steps, stagger };
		this.text = 'tbd';

	}

	set time( time ) {

		console.log( time );

	}

	get output() {

		return this.text;

	}

}

Textformer.charsets = {

	UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGITS: '0123456789',
	SPECIAL: '!@#$%&?'

};

Textformer.charsets.ALL = ( function () {

	const cs = Textformer.charsets;
	return `${cs.UPPERCASE}${cs.DIGITS}${cs.SPECIAL}`;

} )();

Textformer.modes = {

	LINEAR: 'linear',

};

//?// Safest deep copy method
//?// https://stackoverflow.com/questions/31712808/how-to-force-javascript-to-deep-copy-a-string
Textformer.deepCopy = ( string ) => ( ' ' + string ).slice( 1 );

Textformer.getRandomChar = ( charset ) => {

	const randomIndex = Math.floor( Math.random() * charset.length );
	return charset.charAt( randomIndex );

};

export { Textformer };
