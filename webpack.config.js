const path = require( 'path' );

const externals = {
	'dat.gui': 'dat.gui'
};

const config = {

	demo: {
		mode: 'production',
		entry: './src/demo.js',
		output: {
			filename: 'main.js',
			path: path.resolve( __dirname, 'demo' ),
		},
		optimization: { minimize: false },
		externals: externals,
	},

	build: {
		mode: 'production',
		entry: './src/Textformer.js',
		output: {
			path: path.resolve( __dirname, 'build' ),
			filename: 'keda.textformer.min.js',
			library: {
				name: [ 'KEDA', 'Textformer' ],
				type: 'umd',
				export: 'default'
			}
		},
		module: {
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
		},
		externals: externals
	}

};

module.exports = ( env, argv ) => {

	if ( env.demo ) return [ {
		...config.demo,
		externals: {
			...config.demo.externals,
			'../src/Textformer'  : 'KEDA.Textformer'
		}
	}, {
		...config.build,
		output: {
			...config.build.output,
			path: path.resolve( __dirname, 'demo' ),
			filename: 'lib/keda.textformer.min.js',
		}
	} ];

	if ( argv.mode === 'development' ) return {
		...config.demo,
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			contentBase: './demo/',
			host: '192.168.1.10',
			port: 8080,
			disableHostCheck: true,
		},
	};

	return config.build;

};

