import { Textform } from './textformer/textforms/Textform.js';
import { Textformer } from './textformer/Textformer.js';
import * as dat from 'dat.gui';

const demoText = document.querySelector( '#demo-text' );

const options = {
	output: demoText,
	from: '',
	to: 'Textformer',
	steps: 5,
	stagger: 3,
	speed: 15,
	delay: 500,
	mode: 'random',
	align: 'left',
};

const textformer = new Textformer( {
	...options,
	mode: Textformer.modes[ options.mode ],
	align: Textform.aligns[ options.align ],
} );

function update() {

	//?// Hacks needed because otherwise dat.GUI converts objects into strings
	textformer.mode = Textformer.modes[ options.mode ];
	textformer.options.align = Textform.aligns[ options.align ];

	//?// Verify the fill is a single character
	if ( textformer.options.fill.length > 0 )
		textformer.options.fill = textformer.options.fill.charAt( 0 );

	//?// Force duration recomputation
	textformer.playerOptions.duration = 0;

	//?// Rebuilds the textform
	textformer.build();

	//?// Update the display if speed changed
	gui.updateDisplay();

}

function build() {

	textformer.build();

}

const gui = new dat.GUI();

const textform = gui.addFolder( 'Textform' );
textform.add( textformer.options, 'from' ).onChange( update );
textform.add( textformer.options, 'to' ).onChange( update );
textform.add( options, 'mode', Object.keys( Textformer.modes ) ).onChange( update );
textform.add( textformer.options, 'steps', 1, 60 ).step( 1 ).onChange( update );
textform.add( textformer.options, 'stagger', 0, 30 ).step( 1 ).onChange( update );
textform.open();

const player = gui.addFolder( 'Animation' );
player.add( textformer, 'speed', 1, 30 ).step( 1 ).onChange( update );
player.add( textformer, 'progress', 0, 1 ).step( 0.001 ).listen();
player.add( textformer, 'replay' );
player.open();

const advanced = gui.addFolder( 'Advanced' );
advanced.add( options, 'align', Object.keys( Textform.aligns ) ).onChange( update );
advanced.add( textformer.options, 'fill' ).onChange( update );
advanced.add( textformer.options, 'charset', Textform.charsets ).onChange( update );
advanced.add( textformer.playerOptions, 'duration', 150, 10000 ).step( 50 ).onChange( build );
advanced.add( textformer.playerOptions, 'delay', 0, 5000 ).step( 50 ).onChange( update );
// advanced.open();
