import { Textformer } from './textformer/Textformer.js';

const demo = document.querySelector( '#demo' );

const textformer = new Textformer( {

	onUpdate: () => {

		demo.innerHTML = textformer.text;

	},

	// steps: 2,
	// fps: 5,
	// texts: [ 'ABCDE', 'VWXYZ' ],

} );


