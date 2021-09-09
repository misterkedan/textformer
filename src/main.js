import { Textform } from './textformer/textforms/Textform.js';
import { Textformer } from './textformer/Textformer.js';
import * as dat from 'dat.gui';

const demoText = document.querySelector( '#demo-text' );
const textformer = new Textformer( { onChange: update } );

function rebuild() {

	textformer.build();

}

function update() {

	demoText.textContent = textformer.text;

}

const gui = new dat.GUI();

const textform = gui.addFolder( 'Textform' );
textform.add( textformer.options, 'charset', Textform.charsets ).onChange( rebuild );
textform.add( textformer.options, 'from' ).onChange( rebuild );
textform.add( textformer.options, 'to' ).onChange( rebuild );
textform.add( textformer.options, 'steps', 1, 60 ).step( 1 ).onChange( rebuild );
textform.add( textformer.options, 'stagger', 0, 30 ).step( 1 ).onChange( rebuild );
textform.open();

const player = gui.addFolder( 'Animation' );
player.add( textformer.playerOptions, 'duration', 100, 5000 ).step( 50 ).onChange( rebuild );
player.add( textformer, 'progress', 0, 1 ).step( 0.001 ).onChange( update ).listen();
player.add( textformer, 'replay' );
player.open();
