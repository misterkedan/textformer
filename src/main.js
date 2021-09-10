import { Textform } from './textformer/textforms/Textform.js';
import { Textformer } from './textformer/Textformer.js';
import * as dat from 'dat.gui';

const demoText = document.querySelector( '#demo-text' );
const textformer = new Textformer( { onChange: refresh } );

function rebuild() {

	textformer.build();

}

function refresh() {

	demoText.textContent = textformer.text;

}

//?// Hack needed because otherwise dat.GUI converts align methods to strings
textformer.options.align = 'NONE';
function align() {

	textformer.options.align = Textform.aligns[ textformer.options.align ];
	rebuild();

}

const gui = new dat.GUI();

const texts = gui.addFolder( 'Texts' );
texts.add( textformer.options, 'from' ).onChange( rebuild );
texts.add( textformer.options, 'to' ).onChange( rebuild );
texts.add( textformer.options, 'align', Object.keys( Textform.aligns ) ).onChange( align );
texts.open();

const textform = gui.addFolder( 'Textform' );
textform.add( textformer.options, 'charset', Textform.charsets ).onChange( rebuild );
textform.add( textformer.options, 'steps', 1, 60 ).step( 1 ).onChange( rebuild );
textform.add( textformer.options, 'stagger', 0, 30 ).step( 1 ).onChange( rebuild );
textform.open();

const player = gui.addFolder( 'Animation' );
player.add( textformer.playerOptions, 'duration', 100, 5000 ).step( 50 ).onChange( rebuild );
player.add( textformer, 'progress', 0, 1 ).step( 0.001 ).onChange( refresh ).listen();
player.add( textformer, 'replay' );
player.open();
