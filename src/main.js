import { Textform } from './textformer/textforms/Textform.js';
import { Textformer } from './textformer/Textformer.js';
import * as dat from 'dat.gui';

const demo = document.querySelector( '#demo' );

const control = {

	start: '',
	end: 'Textformer',

	fps: 15,
	steps: 5,
	stagger: 3,

	charset: 'ALL',

};

const textformer = new Textformer( {
	onUpdate: () => {

		demo.innerHTML = textformer.text;

	}
} );

function update() {

	if ( ! control.start && ! control.end ) {

		control.start = '';
		control.end = ' ';

	}

	textformer.options.texts = [ control.start, control.end ];

	textformer.options.charset = Textform.charsets[ control.charset ];
	textformer.options.steps = control.steps;
	textformer.options.stagger = control.stagger;

	textformer.fps = control.fps;

	textformer.build();

}

const gui = new dat.GUI();

const texts = gui.addFolder( 'Texts' );
texts.add( control, 'start' ).onChange( update );
texts.add( control, 'end' ).onChange( update );
texts.open();

const tfr = gui.addFolder( 'Textformer' );
tfr.add( control, 'charset', Object.keys( Textform.charsets ) ).onChange( update );
tfr.add( control, 'steps', 1, 60 ).step( 1 ).onChange( update );
tfr.add( control, 'stagger', 0, 30 ).step( 1 ).onChange( update );
tfr.add( control, 'fps', 1, 30 ).step( 1 ).onChange( update );
tfr.add( textformer, 'replay' );
tfr.open();



