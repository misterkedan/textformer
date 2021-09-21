import * as KEDA from './main';
import * as dat from 'dat.gui';

const DESCRIPTION = `
Easy text animations with
random character changes.

Example usage :

const textformer = new KEDA.Textformer( {
	//Target
	output: "#demo-title",

	//Texts
	from: '',
	to: 'Texformer',

	//Core
	mode: KEDA.Textformer.modes.expand,
	steps: 10,
	stagger: 3,
	noise: 2,

	//Autoplay
	autoplay: true,
	speed: 15,
	delay: 500,
} );
`;

const options = {

	//Target to write the result into, can be:
	//'#id', '.class', selected HTML element
	//Writable object, window.console
	output: '#demo-title',

	//Texts
	from: '',
	to: 'Textformer',

	//Options
	mode: KEDA.Textformer.modes.EXPAND,
	steps: 20,
	stagger: 3,
	noise: 0,
	origin: - 1,

	//Autoplay
	// autoplay: false,
	speed: 15,
	easing: KEDA.Textformer.ease.CIRC_OUT,
	delay: 500,
	// duration: 0,
	// repeat: - 1,
	// onBegin: ()=> console.log( 'begin' ),
	// onComplete: ()=> console.log( 'complete'),
	// reverse: true,
	yoyo: true,
	loop: true,
	// reverseSpeed: 2,

	// hover: true,
	// press: true,

	//Align
	align: KEDA.Textformer.align.LEFT,
	fill: '.',

};

const title = new KEDA.Textformer( options );

const text = {
	element: document.querySelector( '#demo-paragraph' ),
	build: () => {

		text.textformer.build( {
			...title.options,
			...text.getOverrides(),
		} );

	},
	getOverrides: () => {

		const length = title.textform.length;
		const factor = ( length > 0 ) ? DESCRIPTION.length / length * 0.25 : 10;
		return {
			output: text.element,
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
text.textformer = title.clone( text.getOverrides() );

/*-----------------------------------------------------------------------------/

	GUI

/-----------------------------------------------------------------------------*/

function rebuild() {

	title.build();
	text.build();

}

function pause() {

	title.pause();
	text.textformer.pause();

}

function setPlayersProperty( key, value ) {

	title.player[ key ] = value;
	text.textformer.player[ key ] = value;

}

function updateProgress() {

	pause();
	setPlayersProperty( 'progress', title.progress );

}

function replay() {

	if ( ! title.player.isPlaying ) gui.controls.play();

}

function updateReversed() {

	setPlayersProperty( 'isReversed', title.reversed );
	replay();

}

function updateEasing() {

	setPlayersProperty( 'ease', KEDA.basicEasing[ title.options.easing ] );
	replay();

}

function updateLoop() {

	const repeats = ( title.options.loop ) ? - 1 : 0;
	setPlayersProperty( 'repeat', repeats );
	replay();

}

function updateYoyo() {

	setPlayersProperty( 'isYoyo', title.options.yoyo );
	replay();

}

if ( ! title.options.duration ) title.options.duration = title.convertSpeedToDuration();

const gui = new dat.GUI();

gui.controls = {

	play: () => {

		const method = ( title.player.isPlaying ) ? 'pause' : 'play';
		title[ method ]();
		text.textformer[ method ]();

	},

};

const textform = gui.addFolder( 'Textform' );
textform.add( title.options, 'from' ).onChange( rebuild );
textform.add( title.options, 'to' ).onChange( rebuild );
textform.add( title.options, 'mode', KEDA.Textformer.modes ).onChange( rebuild );
textform.add( title.options, 'steps', 1, 60 ).step( 1 ).onChange( rebuild );
textform.add( title.options, 'stagger', 0, 30 ).step( 1 ).onChange( rebuild );
textform.add( title.options, 'noise', 0, 30 ).step( 1 ).onChange( rebuild );
textform.open();

const animation = gui.addFolder( 'Animation' );
animation.add( title, 'speed', 1, 30 ).step( 1 ).onChange( rebuild );
animation.add( title.options, 'easing', Object.values( KEDA.Textformer.ease ) ).onChange( updateEasing );
animation.add( title, 'progress', 0, 1 ).step( 0.001 ).onChange( updateProgress ).listen();
animation.add( gui.controls, 'play' );
animation.open();

const advanced = gui.addFolder( 'Advanced' );
advanced.add( title.options, 'charset', KEDA.Textformer.charsets ).onChange( rebuild );
advanced.add( title.options, 'align', KEDA.Textformer.align ).onChange( rebuild );
advanced.add( title.options, 'fill' ).onChange( rebuild );
advanced.add( title.options, 'origin', - 1, 10 ).step( 1 ).onChange( rebuild );
// advanced.open();

const advancedAnimation = gui.addFolder( 'Advanced ( Animation )' );
advancedAnimation.add( title, 'reversed' ).onChange( updateReversed ).listen();
advancedAnimation.add( title.options, 'loop' ).onChange( updateLoop );
advancedAnimation.add( title.options, 'yoyo' ).onChange( updateYoyo );
advancedAnimation.add( title.options, 'delay', 0, 5000 ).step( 50 ).onChange( rebuild );
advancedAnimation.add( title.options, 'duration', 150, 10000 ).step( 50 ).onChange( rebuild ).listen();
advancedAnimation.open();

//Close GUI on mobile & small screens to avoid overlap
const device = navigator.userAgent || navigator.vendor || window.opera;
const deviceIsMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|mediump|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test( device ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( device.substr(0, 4)) );// eslint-disable-line
const windowIsNarrow = ( window.innerWidth < 640 );
if ( deviceIsMobile || windowIsNarrow ) gui.close();
