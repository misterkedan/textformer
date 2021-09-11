import { Textform } from './textformer/textforms/Textform.js';
import { Textformer } from './textformer/Textformer.js';
import * as dat from 'dat.gui';

const demoText = document.querySelector( '#demo-text' );
const textformer = new Textformer( { onChange: refresh, delay: 500 } );

function refresh() {

	demoText.textContent = textformer.text;

}

function rebuild() {

	//?// Hack needed because otherwise dat.GUI converts align methods into strings
	if ( typeof textformer.options.align === 'string' )
		textformer.options.align = Textform.aligns[ textformer.options.align ];

	//?// Verify the fill is a single character
	if ( textformer.options.fill.length > 0 )
		textformer.options.fill = textformer.options.fill.charAt( 0 );

	textformer.build();

}

function rebuildFromSpeed() {

	textformer.playerOptions.duration = 0;
	textformer.build();
	gui.updateDisplay();

}

const gui = new dat.GUI();

const textform = gui.addFolder( 'Textform' );
textform.add( textformer.options, 'from' ).onChange( rebuild );
textform.add( textformer.options, 'to' ).onChange( rebuild );
textform.add( textformer.options, 'steps', 1, 60 ).step( 1 ).onChange( rebuild );
textform.add( textformer.options, 'stagger', 0, 30 ).step( 1 ).onChange( rebuild );
textform.open();

const player = gui.addFolder( 'Animation' );
player.add( textformer, 'speed', 1, 30 ).step( 1 ).onChange( rebuildFromSpeed );
player.add( textformer, 'progress', 0, 1 ).step( 0.001 ).onChange( refresh ).listen();
player.add( textformer, 'replay' );
player.open();

const advanced = gui.addFolder( 'Advanced' );
advanced.add( textformer.options, 'align', Object.keys( Textform.aligns ) ).onChange( rebuild );
advanced.add( textformer.options, 'fill' ).onChange( rebuild );
advanced.add( textformer.options, 'charset', Textform.charsets ).onChange( rebuild );
advanced.add( textformer.playerOptions, 'duration', 150, 10000 ).step( 50 ).onChange( rebuild );
advanced.add( textformer.playerOptions, 'delay', 0, 5000 ).step( 50 ).onChange( rebuild );
// advanced.open();

refresh();
