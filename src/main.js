import { Textformer } from './Textformer';

const demo = new Textformer();
console.log( demo );

function animate( time ) {

	demo.time = time;
	requestAnimationFrame( animate );

}

animate();
