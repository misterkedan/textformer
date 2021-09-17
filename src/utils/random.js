const random = {

	int: ( min, max ) => Math.floor( Math.random() * ( max - min + 1 ) + min ),
	uint: ( max ) => random.int( 0, max ),
	char: ( string ) => string.charAt( random.uint( string.length - 1 ) ),

};

export { random };
