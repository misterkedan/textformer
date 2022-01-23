import { Textformer } from 'textformer';
import { GUI } from 'lil-gui';

/*-----------------------------------------------------------------------------/

	Basic demo

/-----------------------------------------------------------------------------*/

const title = new Textformer( {

	//Target to write the result into, can be:
	//'#id', '.class', selected HTML element,
	//Writable object, window.console
	output: '#demo-title',

	//Texts
	from: '',
	to: 'Textformer',

	//Options
	mode: Textformer.modes.EXPAND,
	steps: 20,
	stagger: 3,
	noise: 0,

	//Autoplay
	speed: 15,
	easing: Textformer.ease.CIRC_OUT,
	delay: 500,
	loop: true,
	yoyo: true,

	//Align
	align: Textformer.align.LEFT,
	fill: '.',

} );

/*-----------------------------------------------------------------------------/

	Advanced

/-----------------------------------------------------------------------------*/

const DESCRIPTION = `
Easy text animations with
random character changes.

Example usage :

const textformer = new Textformer( {

	//Target
	output: "#demo-title",

	//Texts
	from: '',
	to: 'Textformer',

	//Options
	mode: Textformer.modes.EXPAND,
	steps: 20,
	stagger: 3,

	//Autoplay
	speed: 15,
	easing: Textformer.ease.CIRC_OUT,
	delay: 500,

} );`;

const text = {
	element: document.querySelector( '#demo-paragraph' ),
	build: () => {

		text?.textformer.build( {
			...title.options,
			...text?.getOverrides(),
		} );

	},
	getOverrides: () => {

		const length = title.textform.length;
		const factor = ( length > 0 ) ? DESCRIPTION.length / length * 0.25 : 10;
		return {
			output: text?.element,
			from: '',
			to: DESCRIPTION,
			stagger: Math.ceil( title.options.stagger / factor ),
			duration: title.options.duration || title.convertSpeedToDuration( title.options.speed ),
			noise: ( title.options.noise === 0 )
				? 0
				: title.options.noise * factor
		};

	}
};
text.textformer = title.clone( text?.getOverrides() );

if ( ! title.options.duration )
	title.options.duration = title.convertSpeedToDuration();

if ( title.options.origin === undefined ) title.options.origin = - 1;

title.player.onBegin = title.player.onComplete = () => {

	const { options, player } = title;
	options.reversed = player.isReversed;

};

/*-----------------------------------------------------------------------------/

	GUI

/-----------------------------------------------------------------------------*/

const gui = new GUI();
gui.controls = {

	play: () => {

		const method = ( title.player.isPlaying ) ? 'pause' : 'play';
		title[ method ]();
		if ( text ) text.textformer[ method ]();

	},

	rebuild: () => {

		title.build();
		if ( text ) text.build();

	},

	setPlayersProperty: ( key, value ) => {

		title.player[ key ] = value;
		if ( text ) text.textformer.player[ key ] = value;

	},

	updatePlayers: () => {

		const { setPlayersProperty, play } = gui.controls;

		const repeats = ( title.options.loop ) ? - 1 : 0;

		setPlayersProperty( 'repeat', repeats );
		setPlayersProperty( 'isReversed', title.options.reversed );
		setPlayersProperty( 'isYoyo', title.options.yoyo );
		setPlayersProperty( 'ease', Textformer.easing[ title.options.easing ] );

		if ( ! title.player.isPlaying ) play();

	},

	updateProgress: () => {

		title.pause();
		if ( text ) text.textformer.pause();
		gui.controls.setPlayersProperty( 'progress', title.progress );

	},

};
const { rebuild, updatePlayers, updateProgress } = gui.controls;

const textform = gui.addFolder( 'Textform' );
textform.add( title.options, 'from' ).onChange( rebuild );
textform.add( title.options, 'to' ).onChange( rebuild );
textform.add( title.options, 'mode', Textformer.modes ).onChange( rebuild );
textform.add( title.options, 'steps', 1, 60 ).step( 1 ).onChange( rebuild );
textform.add( title.options, 'stagger', 0, 30 ).step( 1 ).onChange( rebuild );
textform.add( title.options, 'noise', 0, 30 ).step( 1 ).onChange( rebuild );
textform.open();

const animation = gui.addFolder( 'Animation' );
animation.add( title, 'speed', 1, 30 ).step( 1 ).onChange( rebuild );
animation.add( title.options, 'easing', Textformer.ease )
	.onChange( updatePlayers );
animation.add( title, 'progress', 0, 1 ).step( 0.001 ).onChange( updateProgress )
	.listen();
animation.add( gui.controls, 'play' );
animation.open();

const advanced = gui.addFolder( 'Advanced' );
advanced.add( title.options, 'charset', Textformer.charsets )
	.onChange( rebuild );
advanced.add( title.options, 'align', Textformer.align ).onChange( rebuild );
advanced.add( title.options, 'fill' ).onChange( rebuild );
advanced.add( title.options, 'origin', - 1, 10 ).step( 1 ).onChange( rebuild );
// advanced.open();

const advancedAnimation = gui.addFolder( 'Advanced ( Animation )' );
advancedAnimation.add( title.options, 'reversed' ).onChange( updatePlayers )
	.listen();
advancedAnimation.add( title.options, 'loop' ).onChange( updatePlayers );
advancedAnimation.add( title.options, 'yoyo' ).onChange( updatePlayers );
advancedAnimation.add( title.options, 'delay', 0, 5000 ).step( 50 )
	.onChange( rebuild );
advancedAnimation.add( title.options, 'duration', 150, 10000 ).step( 50 )
	.onChange( rebuild ).listen();
advancedAnimation.open();

//Close GUI on small screens to avoid overlap
const windowIsNarrow = ( window.innerWidth < 720 );
if ( windowIsNarrow ) gui.close();
