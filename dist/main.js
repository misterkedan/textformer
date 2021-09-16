(()=>{"use strict";var t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)};function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.align=function(e){var n=e.from,r=e.to,o=e.align,i=e.fill;if(void 0!==o){var a=t.modes,u=isNaN(o)?o:o>=0?o<e.length?a.offset:a.right:a.left,s=r.length-n.length;if(0!==s){var c=s>0?"from":"to",f=e[c],l=Math.abs(s),p=i?function(){return i}:function(){return e.generateRandomChar()},h=Array.from({length:l},p).join("");e[c]=u(f,h,o)}}},t.modes={none:void 0,left:function(t,e){return"".concat(t).concat(e)},center:function(t,e,n){var r=e.length;isNaN(n)&&(n=Math.floor(r/2));var o=e.substring(0,n),i=e.substring(n,r);return"".concat(o).concat(t).concat(i)},right:function(t,e){return"".concat(e).concat(t)},offset:function(e,n,r){return t.modes.center(e,n,Math.round(r))}};var r=function(){function r(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=n.from,i=n.to;e(this,r),Object.assign(this,arguments[0]),this.length=Math.max(o.length,i.length),t.align(this),this.build(),this.reset()}var o,i;return o=r,(i=[{key:"build",value:function(){var t=this,e=this.length,n=this.from,r=this.to,o=this.computeStartFrames(),i=0;this.scenario=Array.from({length:e},(function(e,a){return function(e){var a=n.charAt(e),u=r.charAt(e),s=function(t){return t.match(/\r|\n|\t/)};if(s(a))return[{frame:0,char:a}];if(s(u))return[{frame:0,char:u}];var c=t.randomize(t.steps),f=o[e],l=f+c;return Array.from({length:c+1},(function(e,n){return function(e){var n=f+e;return n>i&&(i=n),{frame:n,char:n===f?a:n===l?u:t.generateRandomChar()}}(n)}))}(a)})),this.totalFrames=i+1}},{key:"computeStartFrames",value:function(){var t=this,e=this.length,n=this.stagger,r=this.origin;return r?Array.from({length:e},(function(o,i){var a=i-r,u=a>=0?a*n:(e+a)*n;return t.randomize(u)})):Array.from({length:e},(function(e,r){var o=r*n;return t.randomize(o)}))}},{key:"randomize",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=this.randomness;if(!o)return t;var i=t-e*o,a=t+n*o;return r.generateRandomInt(i,a)}},{key:"generateRandomChar",value:function(){var t=this.charset,e=r.generateRandomInt(0,t.length-1);return t.charAt(e)}},{key:"getCharAt",value:function(t,e){var n=this.scenario[t],r=n.filter((function(t){return t.frame===e}))[0];if(!r){var o=n[0].frame,i=n[n.length-1].frame,a=e>i?i:o;r=n.filter((function(t){return t.frame===a}))[0]}return r.char}},{key:"reset",value:function(){this.progress=0}},{key:"update",value:function(){var t=this,e=this.frame,n=this.length;this.chars=Array.from({length:n},(function(n,r){return t.getCharAt(r,e)})),this.text=this.chars.join(""),this.output&&(this.output.innerHTML=this.text.replace(/ /g,"&nbsp;").replace(/\t/g,"&emsp;").replace(/\n/g,"<br>").replace(/\r/g,"<br>"))}},{key:"frame",get:function(){return this._frame},set:function(t){t!==this._frame&&(this._frame=t,this.update())}},{key:"progress",get:function(){return this._progress},set:function(t){this._progress=t,this.frame=Math.round(this.totalFrames*t)}},{key:"hasValidOrigin",get:function(){var t=this.origin,e=this.length;return void 0!==t&&t>=0&&t<e}}])&&n(o.prototype,i),r}();function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t,e,n){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t,e){if(e&&("object"===o(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}r.generateRandomInt=function(t,e){return Math.floor(Math.random()*(e-t+1)+t)},r.charsets={UPPERCASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",DIGITS:"0123456789",SYMBOLS:"!@#$%&?"},r.charsets.LOWERCASE=r.charsets.UPPERCASE.toLowerCase(),r.charsets.ALL=Object.values(r.charsets).join("");var l=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(p,t);var e,n,r,o,l=(r=p,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=f(r);if(o){var n=f(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return c(this,t)});function p(){return i(this,p),l.apply(this,arguments)}return e=p,(n=[{key:"computeStartFrames",value:function(){return u(f(p.prototype),"computeStartFrames",this).call(this).reverse()}}])&&a(e.prototype,n),p}(r);function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function d(t,e){if(e&&("object"===p(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=g(r);if(o){var n=g(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return d(this,t)});function a(){return h(this,a),i.apply(this,arguments)}return e=a,(n=[{key:"computeStartFrames",value:function(){var t=this,e=this.length,n=this.stagger,r=this.origin,o=this.hasValidOrigin,i=o?r:Math.floor((e-1)/2),a=o||e%2!=0?i:i+1;return Array.from({length:e},(function(e,r){var o=r<a?i-r:r-a;return t.randomize(o*n)}))}}])&&m(e.prototype,n),a}(r);function v(t){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function O(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function j(t,e){return(j=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function k(t,e){if(e&&("object"===v(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function x(t){return(x=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var S=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&j(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=x(r);if(o){var n=x(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return k(this,t)});function a(){return w(this,a),i.apply(this,arguments)}return e=a,(n=[{key:"computeStartFrames",value:function(){var t=this,e=this.length,n=this.stagger,r=this.origin,o=this.hasValidOrigin?r:Math.round((e-1)/2);return Array.from({length:e},(function(r,i){var a=i<o?i:e-1-i;return t.randomize(a*n)}))}}])&&O(e.prototype,n),a}(r);function P(t){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function C(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function R(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function A(t,e,n){return(A="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=F(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function E(t,e){return(E=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function T(t,e){if(e&&("object"===P(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function F(t){return(F=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var M=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&E(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=F(r);if(o){var n=F(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return T(this,t)});function a(){return R(this,a),i.apply(this,arguments)}return e=a,(n=[{key:"computeStartFrames",value:function(){var t=this.origin,e=this.stagger,n=a.shuffle(A(F(a.prototype),"computeStartFrames",this).call(this));return this.hasValidOrigin&&e>0?((n=n.filter((function(t){return t>0}))).splice(t,0,0),n):n}}])&&_(e.prototype,n),a}(r);function z(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function D(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}M.shuffle=function(t){for(var e=function(t){if(Array.isArray(t))return C(t)}(i=t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(i)||function(t,e){if(t){if("string"==typeof t)return C(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(t,e):void 0}}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),n=t.length-1;n>0;n--){var r=Math.floor(Math.random()*(n+1)),o=[e[r],e[n]];e[n]=o[0],e[r]=o[1]}var i;return e};var B=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};z(this,t),Object.assign(this,e)}var e,n;return e=t,(n=[{key:"animate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;!this.time&&t&&(this.time=t);var e=this.textform,n=this.onChange,r=this.onComplete,o=this.duration,i=this.time,a=t-i;if(a>o)return e.progress=1,r&&r.call(),this.stop();var u=e.frame;e.progress=a/o,e.frame!==u&&n&&n.call(),this.requestAnimationFrame()}},{key:"requestAnimationFrame",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(){this.animationFrame=requestAnimationFrame(this.animate.bind(this))}))},{key:"play",value:function(){var t=this.onBegin;t&&t.call(),this.time=0,this.textform.progress=0;var e=this.delay>0?this.delay:0;this.timeout=setTimeout(this.requestAnimationFrame.bind(this),e)}},{key:"stop",value:function(){clearTimeout(this.timeout),cancelAnimationFrame(this.animationFrame)}}])&&D(e.prototype,n),t}();function q(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function I(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var L=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.mode,r=void 0===n?t.modes.default:n,o=e.autoplay,i=void 0===o||o,a=e.speed,u=void 0===a?15:a,s=e.from,c=void 0===s?"Demo":s,f=e.to,l=void 0===f?"Textformer":f,p=e.steps,h=void 0===p?5:p,m=e.stagger,y=void 0===m?3:m,d=e.randomness,g=void 0===d?0:d,b=e.origin,v=e.output,w=e.charset,O=void 0===w?t.charsets.ALL:w,j=e.align,k=void 0===j?t.aligns.left:j,x=e.fill,S=void 0===x?" ":x,P=e.delay,C=void 0===P?0:P,R=e.duration,_=e.onBegin,A=e.onChange,E=e.onComplete;q(this,t),Object.assign(this,{mode:r,autoplay:i,speed:u,options:{from:c,to:l,steps:h,stagger:y,randomness:g,origin:b,output:v,charset:O,align:k,fill:S},playerOptions:{duration:R,delay:C,onBegin:_,onChange:A,onComplete:E}}),this.build()}var e,n;return e=t,(n=[{key:"build",value:function(){var t=this.autoplay,e=this.playerOptions,n=this.player,r=new this.mode(this.options);if(this.textform=r,t){if(!e.duration){var o=Math.abs(this.speed)||1;e.duration=r.totalFrames*(1e3/o)}e.textform=r,n&&n.stop(),this.player=new B(e),this.play()}}},{key:"play",value:function(){this.player&&this.player.play()}},{key:"stop",value:function(){this.player&&this.player.stop()}},{key:"replay",value:function(){this.stop(),this.play()}},{key:"progress",get:function(){return this.textform.progress},set:function(t){this.textform.progress=t}},{key:"text",get:function(){return this.textform.text}}])&&I(e.prototype,n),t}();L.aligns=t.modes,L.charsets=r.charsets,L.modes={default:r,reverse:l,expand:b,collapse:S,shuffle:M};const N=dat.gui;function U(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function V(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?U(Object(n),!0).forEach((function(e){G(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):U(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function G(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var H={output:document.querySelector("#demo-title"),from:"",to:"Textformer",mode:"expand",steps:10,stagger:3,randomness:2,autoplay:!0,speed:15,delay:500,align:"left",fill:".",origin:-1},W=new L(V(V({},H),{},{mode:L.modes[H.mode],align:L.aligns[H.align]})),Y={element:document.querySelector("#demo-paragraph"),textformer:new L,build:function(){var t=Y.text.length/W.textform.length*.25||10,e=Y.textformer;e.mode=W.mode,e.options=V(V({},W.options),{},{output:Y.element,from:"",to:Y.text,stagger:Math.ceil(W.options.stagger/t),randomness:0===W.options.randomness?0:W.options.randomness*t}),e.playerOptions=W.playerOptions,e.build()}};function $(){W.mode=L.modes[H.mode],W.options.align=L.aligns[H.align],W.options.fill.length>0&&(W.options.fill=W.options.fill.charAt(0)),W.playerOptions.duration=0,W.build(),Y.build(),J.updateDisplay()}Y.text="\nEasy text transition animations\nusing random character changes.\nAutowords assemble!\n\nExample usage :\n\nconst textformer = new Textformer( {\n\t//Target HTML Element\n\toutput: \"demo-title\",\n\n\t//Texts\n\tfrom: '',\n\tto: 'Texformer',\n\n\t//Core\n\tmode: Textformer.modes.expand,\n\tsteps: 10,\n\tstagger: 3,\n\trandomness: 2,\n\n\t//Autoplay\n\tautoplay: true,\n\tspeed: 15,\n\tdelay: 500,\n} );\n",Y.build();var J=new N.GUI,K=J.addFolder("Textform");K.add(W.options,"from").onChange($),K.add(W.options,"to").onChange($),K.add(H,"mode",Object.keys(L.modes)).onChange($),K.add(W.options,"steps",1,60).step(1).onChange($),K.add(W.options,"stagger",0,30).step(1).onChange($),K.add(W.options,"randomness",0,30).step(1).onChange($),K.open();var Q=J.addFolder("Animation");Q.add(W,"speed",1,30).step(1).onChange($),Q.add(W,"progress",0,1).step(.001).listen().onChange((function(){return Y.textformer.progress=W.progress})),Q.add(W,"replay").onFinishChange((function(){return Y.textformer.replay()})),Q.open();var X=J.addFolder("Advanced");X.add(H,"align",Object.keys(L.aligns).slice(0,-1)).onChange($),X.add(W.options,"fill").onChange($),X.add(W.options,"charset",L.charsets).onChange($),X.add(W.playerOptions,"duration",150,1e4).step(50).onChange((function(){W.build(),Y.build()})),X.add(W.playerOptions,"delay",0,5e3).step(50).onChange($),X.add(W.options,"origin",-1,10).step(1).onChange($);var Z=navigator.userAgent||navigator.vendor||window.opera,tt=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|mediump|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(Z)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(Z.substr(0,4)),et=window.innerWidth<640;(tt||et)&&J.close()})();