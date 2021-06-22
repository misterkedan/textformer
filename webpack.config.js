const path = require( 'path' );

let config = {

	entry: './src/main.js',

};

module.exports = ( env, argv ) => {

	if ( argv.mode === 'development' ) {

		config.mode = 'development';

		config.output = {
			filename: 'main.js',
			path: path.resolve( __dirname, './dist/' )
		};

		config.devtool = 'inline-source-map';

		config.devServer = {
			contentBase: './dist/',
			host: '192.168.1.10',
			port: 8080,
			disableHostCheck: true,
		};

	} else {

		config.mode = 'production';

		config.output = {
			path: path.resolve( __dirname, './dist/' ),
			filename: 'main.js'
		};

		config.module = {
			rules: [
				{
					test: /\.js$/,
					exclude: [ /node_modules/ ],
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			]
		};

		config.externals = {
			animejs: 'anime',
			'dat.gui': 'dat.gui',
			three: 'THREE'
		};

	}

	return config;

};
