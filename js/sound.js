/* global jsfxr */
/* eslint no-sparse-arrays: "off" */

// Based on:
// https://github.com/mneubrand/jsfxr

var Snake = Snake || {};

Snake.Sound = {
	isMuted: false
};

Snake.Sound.sounds = {

	// (snake) eat food [BLIP]
	snakeEatFood: [
		jsfxr([1,,0.1114,,0.1243,0.4982,,,,,,,,,,,,,1,,,0.1,,0.5]),
		jsfxr([0,,0.1173,,0.1651,0.4355,,,,,,,,0.0803,,,,,1,,,0.1,,0.5]),
		jsfxr([1,,0.1414,,0.1505,0.4521,,,,,,,,,,,,,1,,,0.1,,0.5]),
		jsfxr([0,,0.1663,,0.1741,0.5703,,,,,,,,0.0332,,,,,1,,,0.1,,0.5]),
		jsfxr([1,,0.1717,,0.0341,0.48,,,,,,,,,,,,,1,,,0.1,,0.5])
	],

	// end tron mode? (sad BLIP)
	tronEatFood: [
		jsfxr([0,,0.1142,,0.1895,0.2463,,,,,,,,0.4806,,,,,1,,,0.1,,0.5]),
		jsfxr([1,,0.1594,,0.1926,0.2107,,,,,,,,,,,,,1,,,0.1,,0.5]),
		jsfxr([1,,0.1112,,0.158,0.2041,,,,,,,,,,,,,1,,,0.1,,0.5]),
		jsfxr([0,,0.1896,,0.1158,0.22,,,,,,,,0.4539,,,,,1,,,0.1,,0.5]),
		jsfxr([0,,0.1823,,0.0669,0.3637,,,,,,,,0.0958,,,,,1,,,0.1,,0.5])
	],

	// Starting tron mode: [POWERUP]
	enterTronMode: [
		jsfxr([0,,0.0864,,0.4458,0.2053,,0.3603,,,,,,0.2349,,0.4484,,,1,,,,,0.5]),
		jsfxr([0,,0.2012,,0.4803,0.2939,,0.326,,,,,,0.525,,0.6112,,,1,,,,,0.5]),
		jsfxr([0,,0.2424,,0.2184,0.2631,,0.2023,,,,,,0.2315,,,,,1,,,,,0.5]),
		jsfxr([0,,0.0429,,0.4426,0.5,,0.2284,,,,,,0.1798,,,,,1,,,,,0.5]),
		jsfxr([1,,0.2311,,0.2188,0.2821,,0.0801,,,,,,,,,,,1,,,,,0.5])
	],

	// die in snake mode [HIT]
	snakeDie: [
		jsfxr([0,,0.01,,0.2869,0.5177,,-0.4476,,,,,,0.11,,,,,1,,,,,0.5]),
		jsfxr([0,,0.0351,,0.2305,0.6125,,-0.6412,,,,,,0.4387,,,,,1,,,,,0.5]),
		jsfxr([1,,0.0177,,0.2814,0.6055,,-0.5082,,,,,,,,,,,1,,,0.0859,,0.5]),
		jsfxr([1,,0.0483,,0.1775,0.3365,,-0.3196,,,,,,,,,,,1,,,,,0.5]),
		jsfxr([1,,0.049,,0.1309,0.3715,,-0.3916,,,,,,,,,,,1,,,0.0678,,0.5])
	],

	// die in tron mode [EXPLOSION]
	tronDie: [
		jsfxr([3,,0.371,0.5449,0.4937,0.2121,,0.0796,,,,,,,,0.7837,,,1,,,,,0.5]),
		jsfxr([3,,0.2394,0.4801,0.1741,0.3551,,-0.3345,,,,0.1722,0.6674,,,,,,1,,,,,0.5]),
		jsfxr([3,,0.2165,0.4098,0.2652,0.0386,,-0.0559,,,,,,,,0.4027,,,1,,,,,0.5]),
		jsfxr([3,,0.3649,0.7376,0.436,0.1946,,-0.3909,,,,,,,,0.3619,,,1,,,,,0.5]),
		jsfxr([3,,0.242,0.4038,0.1806,0.08,,-0.0453,,,,,,,,,,,1,,,,,0.5])
	],

	// changing direction in tron mode [LASER]
	tronMove: [
		jsfxr([0,,0.2585,,0.2304,0.7746,0.2757,-0.241,,,,,,0.6346,-0.4449,,,,1,,,0.2477,,0.5]),
		jsfxr([1,,0.1187,0.2882,0.3815,0.5199,0.2,-0.222,,,,,,0.7643,-0.3786,,,,1,,,,,0.5]),
		jsfxr([0,,0.2714,,0.1939,0.7659,0.5204,-0.1711,,,,,,0.7968,-0.1646,,0.1522,-0.0163,1,,,0.0453,,0.5]),
		jsfxr([1,,0.1708,,0.3431,0.5202,0.2,-0.2127,,,,,,0.6461,-0.553,,,,1,,,0.2716,,0.5]),
		jsfxr([0,,0.2135,0.1768,0.1713,0.7404,0.2,-0.2497,,,,,,0.525,-0.0116,,,,1,,,,,0.5])
	],

	// going through glitched wall [JUMP]
	glitchedWall: [
		jsfxr([0,,0.3467,,0.126,0.4379,,0.2274,,,,,,0.1401,,,,,1,,,,,0.5]),
		jsfxr([0,,0.3012,,0.1961,0.4809,,0.1517,,,,,,0.548,,,,,1,,,,,0.5]),
		jsfxr([0,,0.3456,,0.2811,0.3238,,0.145,,,,,,0.2244,,,,,0.4066,,,0.0392,,0.5]),
		jsfxr([0,,0.3237,,0.2572,0.3594,,0.1178,,,,,,0.4703,,,,,1,,,0.2011,,0.5]),
		jsfxr([0,,0.3525,,0.1996,0.3101,,0.2567,,,,,,0.3032,,,,,1,,,,,0.5])
	],

	// hi score (COIN)
	hiScore: [
		jsfxr([0,,0.0401,0.379,0.4666,0.5605,,,,,,0.44,0.5241,,,,,,1,,,,,0.5]),
		jsfxr([0,,0.0612,0.5269,0.4113,0.4149,,,,,,0.3262,0.6716,,,,,,1,,,,,0.5]),
		jsfxr([0,,0.085,0.5219,0.2917,0.4561,,,,,,0.4629,0.5089,,,,,,1,,,,,0.5]),
		jsfxr([0,,0.0122,0.3796,0.4865,0.823,,,,,,0.482,0.5611,,,,,,1,,,,,0.5]),
		jsfxr([0,,0.089,0.4769,0.4621,0.6073,,,,,,0.4516,0.5814,,,,,,1,,,,,0.5])
	]
};

Snake.Sound.init = function() {
	if (Snake.MOBILE) {
		// init sound on touch event
		document.addEventListener('touchstart', function(e){
			if (e) {
				e.currentTarget.removeEventListener(e.type, arguments.callee);
			}
			Snake.Sound.initAudio();
		});
		this.toggleMute(); // start muted on mobile
	} else {
		Snake.Sound.initAudio();
	}
};

Snake.Sound.initAudio = function() {
	// turn all audio clips into audio elements, play and pause them
	// to make them playable on mobile

	var isiOS = (navigator.userAgent.match(/iPhone|iPod|iPad/i));

	Object.keys(this.sounds).forEach(function(name){
		var sounds = this.sounds[name];

		// Mobile Safari on iOS seems to have trouble loading so many audio elements
		// and their sounds (even from data URLs), so we limit sounds to one per type.
		// Except tronMove type, because it sounds way better when having different
		// tone on each turn.
		if (isiOS && name !== "tronMove") {
			sounds = [ sounds[Snake.Game.random(0, sounds.length - 1)] ]; // pick up random one so there can be different sounds on each refresh
		}

		sounds = sounds.map(function(sound){
			var player = new Audio();
			player.src = sound;
			var promise = player.play();

			// Firefox doesn't return promise
			if (promise && promise.catch) {
				promise.catch(function() {
				// silently ignore any play errors
				});
			}
			player.pause();
			return player;
		});

		this.sounds[name] = sounds;
	}.bind(this));
};

Snake.Sound.play = function(name) {
	var i = Snake.Game.random(0, this.sounds[name].length - 1);

	this.player.src = this.sounds[name][i];

	var promise = this.player.play();

	// Firefox doesn't return promise
	if (promise && promise.catch) {
		promise.catch(function() {
		// silently ignore any play errors
		});
	}
};

// override .play method to use mobile audio clips
Snake.Sound.play = function(name) {
	if (this.isMuted) return;

	var i = Snake.Game.random(0, this.sounds[name].length - 1);
	if (Snake.MOBILE) {
		this.sounds[name][i].currentTime = 0;
	}
	this.sounds[name][i].play();

	var promise = this.sounds[name][i].play();

	// Firefox doesn't return promise
	if (promise && promise.catch) {
		promise.catch(function() {
		// silently ignore any play errors
		});
	}
};

Snake.Sound.playEatFood = function(mode) {
	this.play(mode === 'tron' ? 'tronEatFood' : 'snakeEatFood');
};

Snake.Sound.playEatBuggyBug = function() {
	this.play('tronEatFood');
};

Snake.Sound.playEnterTronMode = function() {
	this.play('enterTronMode');
};

Snake.Sound.playDie = function(mode) {
	this.play(mode === 'tron' ? 'tronDie' : 'snakeDie');
};

Snake.Sound.playMove = function(mode) {
	if (mode === 'tron') {
		this.play('tronMove');
	}
};

Snake.Sound.playGlitchedWall = function() {
	this.play('glitchedWall');
};

Snake.Sound.playHiScore = function() {
	this.play('hiScore');
};

Snake.Sound.toggleMute = function() {
	this.isMuted = !this.isMuted;
	this.playEatFood(); // play sample sound so user can hear how loud it will be

	// it's not nice to depend on DOM here, but it's simplest solution
	document.querySelector('[data-action=mute]').classList.toggle('on');
};
