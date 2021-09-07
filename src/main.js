import { Textform } from './textformer/textforms/Textform.js';
import { Textformer } from './textformer/Textformer.js';
import * as dat from 'dat.gui';

const demoText = document.querySelector( '#demo-text' );

const textformer = new Textformer( {
	onUpdate: () => {

		demoText.innerHTML = textformer.text;

	}
} );

const settings = {

	start: '',
	end: 'Textformer',

	fps: 15,
	steps: 5,
	stagger: 3,

	charset: 'ALL',

};

function update() {

	if ( ! settings.start && ! settings.end ) {

		settings.start = '';
		settings.end = ' ';

	}

	textformer.options.texts = [ settings.start, settings.end ];

	textformer.options.charset = Textform.charsets[ settings.charset ];
	textformer.options.steps = settings.steps;
	textformer.options.stagger = settings.stagger;

	textformer.fps = settings.fps;

	textformer.build();

}

const gui = new dat.GUI();

const texts = gui.addFolder( 'Texts' );
texts.add( settings, 'start' ).onChange( update );
texts.add( settings, 'end' ).onChange( update );
texts.open();

const tfr = gui.addFolder( 'Textformer' );
tfr.add( settings, 'charset', Object.keys( Textform.charsets ) ).onChange( update );
tfr.add( settings, 'steps', 1, 60 ).step( 1 ).onChange( update );
tfr.add( settings, 'stagger', 0, 30 ).step( 1 ).onChange( update );
tfr.add( settings, 'fps', 1, 30 ).step( 1 ).onChange( update );
tfr.add( textformer, 'replay' );
tfr.open();
