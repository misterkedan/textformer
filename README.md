# KEDA.Textformer
Easy text animations with random character changes.  

![Preview](img/preview.gif)

<br>

# Basic usage
<br>

```javascript

	const demo = new KEDA.Textformer({

		mode: KEDA.Textformer.modes.EXPAND,
		from:   '', // Initial text
		to: 'Demo', // Final text
		steps:  20, // Number of character changes
		stagger: 3, // Stagger (in steps) between characters
		noise:   0, // Randomness added to steps & stagger
		speed:  15, // Number of character changes per second

	});

```
<br>

# Advanced options

## Core  

```javascript

	// Possible modes
	mode: KEDA.Textformer.modes.BASIC,
	mode: KEDA.Textformer.modes.REVERSE,
	mode: KEDA.Textformer.modes.EXPAND,
	mode: KEDA.Textformer.modes.COLLAPSE,
	mode: KEDA.Textformer.modes.SHUFFLE,

	// Concatenated character pool
	// Used for random character draws
	charset: Textformer.charsets.UPPERCASE,
	charset: Textformer.charsets.LOWERCASE,
	charset: Textformer.charsets.DIGITS,
	charset: Textformer.charsets.SYMBOLS,
	charset: Textformer.charsets.ALL,
	charset: 'abc',

	// Character index the animation starts or ends from
	// Depending on the mode
	origin: 0, 

```
<br>

## Output

Element to automatically write the text into.  

```javascript

	// Valid DOM id selector
	output: '#demo',

	// Valid DOM class selector
	output: '.demo', 

	// HTML element
	output: document.querySelector('demo'), 

	// Any writeable object
	// This will use its property 'textform'
	output: {textform: 'demo'},

	// window.console, for debugging
	output: console,

```
Using a DOM element will escape whitespaces to avoid whitespace collapsing.  
If outputing straight to the DOM, I recommend using a monospace font, and in some cases the CSS setting *overflow-wrap: break-word;*  
Weird visual behaviors can still occur if the text is wider than the screen, especially for long texts, because of word wrapping changing the text's structure.
<br>
<br>

## Autoplay

The animation is ran using a built-in basic player.  
You can bypass this by setting ***autoplay*** to ***false***, and then animate the textformer.progress from 0 to 1, using a custom requestAnimationFrame, GSAP etc...  
Note that doing so will invalidate all playback related options, such as speed, delay, loop etc.

```javascript

	const demo = new KEDA.Textformer({
		from: 'foo',
		to: 'bar',
		autoplay: false,
	});

	console.log( demo.text );     // Outputs: 'foo'
	console.log( demo.progress ); // Outputs: 0
	demo.progress = 1;
	console.log( demo.text );     // Outputs: 'bar'

```
<br>

## Animation

```javascript

	// Plays the animation automatically (see above).
	autoplay: true, 

	// Milliseconds to wait before playing
	delay: 500,

	// Overrides the speed option
	// Use if you need a fixed duration
	// Speed is usually more consistent
	duration: 0,

	// Play the animation backwards
	reversed: false,

	// Speed multiplier, useful for yoyo animations
	reverseSpeed: 1.5,

	// Times to repeat the animation
	// Set to -1 for infinite loop
	repeat: 0,

	// Loops the animation indefinitely
	// Shorthand for repeat: -1
	loop: true,

	// Toggles direction when reaching either end
	yoyo: false,

```
<br>

## Easing

The built-in player can add some basic easing to the animations.  

```javascript

	easing: Textformer.ease.LINEAR, // Default
	easing: Textformer.ease.CIRC_IN,
	easing: Textformer.ease.CIRC_OUT,
	easing: Textformer.ease.CIRC_IN_OUT,
	easing: Textformer.ease.SINE_IN_,	
	// Etc...
	// Functions available: 
	// SINE, CIRC, QUAD, CUBIC, QUART, QUINT, EXPO

```
<br>

## Callbacks

Callback functions can be fired on specific conditions.

```javascript

	onBegin	  : () => console.log( 'animation starts' ),
	onUpdate  : () => console.log( 'enter a new frame' ),
	onChange  : () => console.log( 'the text changed' ),
	onComplete: () => console.log( 'animation ends' ),

```
<br>

## Events
Those two options allows for easy mouse control of the animation, using the built-in player.  
This provides an easy way to play the animation forward on pointerenter / pointerdown, and reverse it on pointerleave / pointerup. 

```javascript
	// For pointerenter + pointerleave
	hover: true,

	// For pointerdown + pointerup
	press: true,
```
<br>

## Align

Option to align ***from*** and ***to*** texts.  
This is done by padding the shorter text to match the longer text's length, using a fill string.  
*For example, aligning "foo" on the right, with a 5 characters word, using "-", will give "--foo"*

```javascript
	// Possible aligns
	align: Textformer.align.NONE,
	align: Textformer.align.LEFT,
	align: Textformer.align.CENTER,
	align: Textformer.align.RIGHT,
	
	// Fill string used for aligning the texts
	fill: ' ',   // Uses whitespace by default
	fill: 'abc', // Will be repeated if too short (abcabc...)
```
<br>

# Summary

*With default values.*

```javascript
	const demo = new KEDA.Textformer({

		// Core
		mode: Textformer.modes.BASIC,
		from: undefined,
		to: undefined,
		steps: 5,
		stagger: 3,
		noise: 0,
		charset: Textformer.charsets.ALL,
		origin: undefined,
		output: undefined,

		// Align
		align: Textformer.align.NONE,
		fill: ' ',

		// Player
		autoplay: true,
		speed: Textformer.DEFAULT_SPEED,
		easing: Textformer.ease.LINEAR,
		delay: 0,
		duration: 0,
		reversed: false,
		reverseSpeed: 1,
		repeat: 0,
		loop: false,
		yoyo: false,

		// Callbacks
		onBegin: undefined,
		onUpdate: undefined,
		onChange: undefined,
		onComplete: undefined,

		// Events
		hover: false,
		press: false,
		
	)};
```
<br>

***
*Pierre Keda - 2021*
