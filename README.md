# Textformer
![Preview](img/preview.gif)

Easy text animations with random character changes.  

[Demo](https://pierrekeda.github.io/textformer/)  

# Installation

Via [npm](https://www.npmjs.com/package/textformer) 

	npm install textformer --save

```javascript
import { Textformer } from 'textformer';
```

Or manually import [the minified build](build/textformer.min.js).

```html
<script src="textformer.min.js"></script>
```

# Basic usage

```javascript

const demo = new Textformer({

	mode: Textformer.modes.EXPAND,
	from:   '', // Initial text
	to: 'Demo', // Final text
	steps:  20, // Number of character changes
	stagger: 3, // Stagger (in steps) between characters
	noise:   0, // Randomness added to steps & stagger
	speed:  15, // Number of character changes per second

});

```

# Advanced options

## Core  

```javascript
// Possible modes
mode: Textformer.modes.BASIC,
mode: Textformer.modes.REVERSE,
mode: Textformer.modes.EXPAND,
mode: Textformer.modes.COLLAPSE,
mode: Textformer.modes.SHUFFLE,

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
Using a DOM element will automatically escape the output for HTML.  
If this is not the desired behavior, you can output to a JS object and manually
update a DOM element instead.  

If outputing straight to the DOM, monospace fonts are recommended.

In some cases, the following CSS settings can help avoid word wrap / line break related visual bugs:  
```css
overflow-wrap: break-word;

word-wrap: break-word;
white-space: pre;
```

## Autoplay

The animation is ran using a built-in basic player.  
You can bypass this by setting ***autoplay*** to ***false***, and then animate the textformer.progress from 0 to 1, using a custom requestAnimationFrame, GSAP etc...  
Note that doing so will invalidate all playback related options, such as speed, delay, loop etc.

```javascript
const demo = new Textformer({
	from: 'foo',
	to: 'bar',
	autoplay: false,
});

console.log( demo.text );     // Outputs: 'foo'
console.log( demo.progress ); // Outputs: 0
demo.progress = 1;
console.log( demo.text );     // Outputs: 'bar'
```

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

// Milliseconds to wait before playing in reverse mode
// Useful for yoyo animations
// Uses regular delay if unspecified
reverseDelay: 1500,

// Times to repeat the animation
// Set to -1 for infinite loop
repeat: 0,

// Loops the animation indefinitely
// Shorthand for repeat: -1
loop: true,

// Toggles direction when reaching either end
yoyo: false,
```

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

## Callbacks

Callback functions can be fired on specific conditions.

```javascript
onBegin	  : () => console.log( 'animation starts' ),
onUpdate  : () => console.log( 'enter a new frame' ),
onChange  : () => console.log( 'the text changed' ),
onComplete: () => console.log( 'animation ends' ),
```

## Events
Those two options allows for easy mouse control of the animation, using the built-in player.  
This provides an easy way to play the animation forward on pointerenter / pointerdown, and reverse it on pointerleave / pointerup. 

```javascript
// For pointerenter + pointerleave
hover: true,

// For pointerdown + pointerup
press: true,
```

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

## Defaults

If you need a specific option to default to a specific value for all your Textformer instances, you can set it via the static property Textformer.defaults.

```javascript
Textformer.defaults.steps = 15; // Steps will now default to 15
```

## Build

If you only need a built textform to animate with another tween engine, you can use the static method Textformer.build( options ) instead of a regular constructor. It will invalidate any autoplay or event option, and return a basic Textform instance. You can then animate its progress property as you like.

```javascript
const textform = Textformer.build( options );
textform.progress = 0.5;
```

# Summary

With default values.

```javascript
const demo = new Textformer({

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
	reverseDelay: undefined,
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

***
*Pierre Keda - 2021*
