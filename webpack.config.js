const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );

const config = {

	demo: {
		mode: 'production',
		entry: './src/demo.js',
		output: {
			filename: 'main.js',
			path: path.resolve( __dirname, 'demo' ),
		},
		externals: {
			'dat.gui': 'dat.gui',
		},
	},

	dev: {
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			contentBase: './demo/',
			host: '192.168.1.10',
			port: 8080,
			disableHostCheck: true,
		},
	},

	build: {
		mode: 'production',
		entry: './src/build.js',
		output: {
			path: path.resolve( __dirname, 'build' ),
			filename: 'textformer.min.js',
			library: {
				name: [ 'Textformer' ],
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
		optimization: {
			minimize: true,
			minimizer: [ new TerserPlugin( {
				terserOptions:{
					mangle: {
						reserved: [
							'Textformer',
							'Textform',
							'TextformPlayer'
						]
					},
				}
			} ) ]
		},
	}

};

module.exports = ( env, argv ) => {

	if ( argv.mode === 'development' ) return {
		...config.demo,
		...config.dev
	};

	return [
		{
			...config.demo,
			externals: {
				...config.demo.externals,
				'Textformer': 'Textformer'
			},
		},
		{
			...config.build,
			output: {
				...config.build.output,
				path: path.resolve( __dirname, 'demo/lib/' ),
			}
		},
		config.build
	];

};

