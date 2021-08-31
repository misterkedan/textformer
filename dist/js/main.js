/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/textformer/textforms/Textform.js
class Textform {

	constructor( { texts, charset, steps, stagger } = {} ) {

		Object.assign( this, { texts, charset, steps, stagger } );

		this.maxLength = this.texts.reduce(
			( a, b ) => a.length > b.length ? a.length : b.length
		);

		this.build();
		this.finalFrame = this.frames.length - 1;

		this.reset();

	}

	build() {

		this.frames = [];
		console.warn( 'Abstract class' );

	}

	reset() {

		this.currentFrame = 0;
		this.chars = this.texts[ 0 ].split( '' );
		this.isComplete = false;

	}

	step() {

		if ( this.currentFrame < this.finalFrame ) {

			this.currentFrame ++;
			this.update();

			if ( this.currentFrame === this.finalFrame ) this.isComplete = true;

		}

	}

	update() {

		const changes = this.frames[ this.currentFrame ];

		for ( let i in changes ) {

			const change = changes[ i ];
			this.chars[ change.i ] = change.char;

		}

	}

	getRandomChar() {

		const charset = this.charset;
		const randomIndex = Math.floor( Math.random() * charset.length );
		return charset.charAt( randomIndex );

	}

	get text() {

		return this.chars.join( '' );

	}

}

Textform.charsets = {

	UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	DIGITS: '0123456789',
	SYMBOLS: '!@#$%&?',

};
Textform.charsets.LOWERCASE = Textform.charsets.UPPERCASE.toLowerCase();
Textform.charsets.ALL = Object.values( Textform.charsets ).join( '' );



;// CONCATENATED MODULE: ./src/textformer/textforms/RandomLinearTextform.js


class RandomLinearTextform extends Textform {

	constructor( options = {} ) {

		super( options );

	}

	build() {

		const frames = [];
		const texts = this.texts;
		const lastText = texts.length - 1;

		for ( let text = 0; text < lastText; text ++ ) {

			const startText = texts[ text ];
			const endText = texts[ text + 1 ] || texts[ endText ];

			for ( let i = 0, l = this.maxLength; i < l; i ++ ) {

				const startFrame = i * this.stagger;
				const endFrame = startFrame + this.steps;
				const startChar = startText.charAt( i );
				const endChar = endText.charAt( i );

				for ( let frame = startFrame; frame <= endFrame; frame ++ ) {

					if ( ! frames[ frame ] ) frames[ frame ] = [];

					const step = frame - startFrame;

					const char = ( step === this.steps )
						? endChar
						: ( step === 0 )
							? startChar
							: this.getRandomChar();

					frames[ frame ].push( { i, char } );

				}

			}

		}

		this.frames = frames;

	}

}



;// CONCATENATED MODULE: ./src/textformer/Textformer.js



//?// This is both a textform factory and barebones animation system

class Textformer {

	constructor( {

		texts = [ '', 'Textformer' ],
		charset = Textform.charsets.ALL,
		steps = 5,
		stagger = 3,

		onBegin = null,
		onUpdate = null,
		onComplete = null,

		mode = Textformer.modes.linear,
		fps = 15,
		auto = true,

	} = {} ) {

		if ( ! texts || ! Array.isArray( texts ) || typeof ( texts[ 0 ] ) !== 'string'  ) {

			throw new TypeError( 'Parameter "texts" must be an array of strings' );

		}

		const options = { texts, charset, steps, stagger };
		Object.assign( this, { mode, options, fps, onBegin, onUpdate, onComplete, auto } );

		this.build();

	}

	build() {

		if ( this.mode.prototype instanceof Textform === false ) throw new Error( 'Please select a mode from Texformer.modes' );
		const textform = new this.mode( this.options );
		this.textform = textform;


		if ( this.auto ) this.autoPlay();

	}

	autoPlay() {

		const onBegin = this.onBegin;

		this.frameDuration = 1000 / this.fps;
		this.time = 0;

		if ( onBegin ) onBegin.call();
		this.animationFrame = requestAnimationFrame( this.animate.bind( this ) );

	}

	animate( time = 0 ) {

		const textform = this.textform;
		const onUpdate = this.onUpdate;
		const onComplete = this.onComplete;

		if ( ! this.time ) this.time = time;

		const delta = time - this.time;
		const diff = this.frameDuration - delta;

		if ( diff <= 0 ) {

			if ( textform.isComplete ) {

				if ( onComplete ) onComplete.call();
				return cancelAnimationFrame( this.animationFrame );

			}

			textform.step();
			if ( onUpdate ) onUpdate.call();
			this.time = time + diff;

		}

		this.animationFrame = requestAnimationFrame( this.animate.bind( this ) );

	}

	replay() {

		cancelAnimationFrame( this.animationFrame );
		this.textform.reset();
		this.autoPlay();

	}

	get text() {

		return this.textform.text;

	}

}

Textformer.modes = {

	linear: RandomLinearTextform

};



;// CONCATENATED MODULE: external "dat.gui"
const external_dat_gui_namespaceObject = dat.gui;
;// CONCATENATED MODULE: ./src/main.js




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

const gui = new external_dat_gui_namespaceObject.GUI();

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




/******/ })()
;