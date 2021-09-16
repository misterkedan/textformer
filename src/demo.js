import * as KEDA from './main';
import * as dat from 'dat.gui';

const options = {
	//Target HTML Element
	output: document.querySelector( '#demo-title' ),

	//Texts
	from: '',
	to: 'Textformer',

	//Core
	mode: 'expand',
	steps: 10,
	stagger: 3,
	randomness: 2,

	//Autoplay
	autoplay: true,
	speed: 15,
	delay: 500,

	//Advanced
	align: 'left',
	fill: '.',
	origin: - 1,
};

const demo = new KEDA.Textformer( {
	...options,
	mode: KEDA.Textformer.modes[ options.mode ],
	align: KEDA.Textformer.aligns[ options.align ],
} );

const paragraph = {
	element: document.querySelector( '#demo-paragraph' ),
	textformer: new KEDA.Textformer(),
	build: () => {

		const factor = paragraph.text.length / demo.textform.length * 0.25 || 10;

		const p = paragraph.textformer;
		p.mode = demo.mode;
		p.options = {
			...demo.options,
			output: paragraph.element,
			from: '',
			to: paragraph.text,
			stagger: Math.ceil( demo.options.stagger / factor ),
			randomness: ( demo.options.randomness === 0 )
				? 0 : demo.options.randomness * factor
		};
		p.playerOptions = demo.playerOptions;
		p.build();

	},
};

paragraph.text = `
Easy text transition animations
using random character changes.

Example usage :

const textformer = new KEDA.Textformer( {
	//Target HTML Element
	output: "demo-title",

	//Texts
	from: '',
	to: 'Texformer',

	//Core
	mode: KEDA.Textformer.modes.expand,
	steps: 10,
	stagger: 3,
	randomness: 2,

	//Autoplay
	autoplay: true,
	speed: 15,
	delay: 500,
} );
`;

paragraph.build();

/*-----------------------------------------------------------------------------/

	GUI

/-----------------------------------------------------------------------------*/

function build() {

	demo.build();
	paragraph.build();

}

function onGUIChange() {

	//Hacks needed because dat.GUI converts objects into strings
	demo.mode = KEDA.Textformer.modes[ options.mode ];
	demo.options.align = KEDA.Textformer.aligns[ options.align ];

	//Multiple characters fills won't work
	if ( demo.options.fill.length > 0 )
		demo.options.fill = demo.options.fill.charAt( 0 );

	//Force duration recomputation based on speed
	demo.playerOptions.duration = 0;

	//Rebuild both KEDA.Textformers
	build();

	//To update the duration on the gui, if speed changed
	gui.updateDisplay();

}

const gui = new dat.GUI();

const textform = gui.addFolder( 'Textform' );
textform.add( demo.options, 'from' )
	.onChange( onGUIChange );
textform.add( demo.options, 'to' )
	.onChange( onGUIChange );
textform.add( options, 'mode', Object.keys( KEDA.Textformer.modes ) )
	.onChange( onGUIChange );
textform.add( demo.options, 'steps', 1, 60 )
	.step( 1 )
	.onChange( onGUIChange );
textform.add( demo.options, 'stagger', 0, 30 )
	.step( 1 )
	.onChange( onGUIChange );
textform.add( demo.options, 'randomness', 0, 30 )
	.step( 1 )
	.onChange( onGUIChange );
textform.open();

const player = gui.addFolder( 'Animation' );
player.add( demo, 'speed', 1, 30 )
	.step( 1 )
	.onChange( onGUIChange );
player.add( demo, 'progress', 0, 1 )
	.step( 0.001 )
	.listen()
	.onChange( ()=> paragraph.textformer.progress = demo.progress );
player.add( demo, 'replay' )
	.onFinishChange( () => paragraph.textformer.replay() );
player.open();

const advanced = gui.addFolder( 'Advanced' );
advanced.add( options, 'align', Object.keys( KEDA.Textformer.aligns ).slice( 0, - 1 ) )
	.onChange( onGUIChange );
advanced.add( demo.options, 'fill' )
	.onChange( onGUIChange );
advanced.add( demo.options, 'charset', KEDA.Textformer.charsets )
	.onChange( onGUIChange );
advanced.add( demo.playerOptions, 'duration', 150, 10000 )
	.step( 50 )
	.onChange( build );
advanced.add( demo.playerOptions, 'delay', 0, 5000 )
	.step( 50 )
	.onChange( onGUIChange );
advanced.add( demo.options, 'origin', - 1, 10 )
	.step( 1 )
	.onChange( onGUIChange );
// advanced.open();

//Close GUI on mobile & small screens to avoid overlap
const device = navigator.userAgent || navigator.vendor || window.opera;
/*eslint-disable*/
const deviceIsMobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|mediump|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test( device ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( device.substr(0, 4)) );
/*eslint-enable*/
const windowIsNarrow = ( window.innerWidth < 640 );
if ( deviceIsMobile || windowIsNarrow ) gui.close();