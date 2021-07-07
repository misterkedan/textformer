import { Textformer } from './textformer/Textformer';

const demo = new Textformer( [ 'ABCDE', 'VWXYZ' ], {
	steps: 3,
	stagger: 1
} );

const FPS = 10;
const FRAME_DURATION = 1000 / FPS;
let currentTime = 0;
let lastTime = 0;
let delta = 0;
let diff = 0;

function animate( time = 0 ) {

	currentTime = time;

	delta = currentTime - lastTime;
	diff = FRAME_DURATION - delta;
	if ( diff <= 0 ) {

		demo.step();
		lastTime = currentTime + diff;

	}

	requestAnimationFrame( animate );

}

animate();
