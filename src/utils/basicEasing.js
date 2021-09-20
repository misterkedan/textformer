const basicEasing = {
	linear: t => t
};

const functions = {
	Sine: t => 1 - Math.cos( t * Math.PI / 2 ),
	Circ: t => 1 - Math.sqrt( 1 - t * t ),
	Quad: t => Math.pow( t, 2 ),
	Cubic: t => Math.pow( t, 4 ),
	Quart: t => Math.pow( t, 6 ),
	Quint: t => Math.pow( t, 8 ),
	Expo: t => Math.pow( t, 10 ),
};

//Implementation shamelessly stolen from Julian Garnier's anime.js
//(https://github.com/juliangarnier/anime)
Object.keys( functions ).forEach( name => {

	const easeIn = functions[ name ];
	basicEasing[ 'easeIn' + name ] = easeIn;
	basicEasing[ 'easeOut' + name ] = t => 1 - easeIn( 1 - t );
	basicEasing[ 'easeInOut' + name ] = t => t < 0.5 ? easeIn( t * 2 ) / 2 :
		1 - easeIn( t * - 2 + 2 ) / 2;

} );

export { basicEasing };
