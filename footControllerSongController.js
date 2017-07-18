inlets = 1;
outlets = 2;

var store = {};
var ButtonTypes = ['clip', 'note', 'note_latch', 'looper'];

function songToState(song) {
	switch (song) {
		default: return stateFromTypes();
	}
}


function init() {
	store.state = songToState();
	store.inputHandler = songToInputHandler();
}

var defaultScale = [0,2,3,5,7,10,12];

function defaultButtons() {
	var buttons = [];
	for (var i = 0; i < 7; i++) {
		buttons.push(new Button(i, 48 + defaultScale[i], 100, true));
	}
	return buttons;
}

function stateFromTypes() {
	var state = {};
	state.buttons = defaultButtons();
	state.leds = [0, 0, 0, 0, 0, 0, 0];
	return state;
}

function Button(led, note, velocity, latching) {
	this.led = led;
	this.note = note || 12;
	this.latching = latching || 0;
	this.velocity = velocity || 100;
	this.state = 0;
	var weakSelf = this;
	this.handle = function (input) {
		if (weakSelf.latching != 0) {
			if (input != 0) {
				weakSelf.state = 1 - weakSelf.state;
				weakSelf.trigger();
			}
		} else {
			weakSelf.state = input;
			weakSelf.trigger();
		}
	}
	this.trigger = function () {
		outlet(1, 'note ' + weakSelf.note + ' ' + weakSelf.state * weakSelf.velocity);
		outlet(0, '/led/' + weakSelf.led + '/' + weakSelf.state * 127);
	}
	this.destruct = function () {
		weakSelf.state = 0;
		weakSelf.trigger();
	}
}

function mutate(newState) {
	store.state = newState;
}

function songToInputHandler(song) {
	switch (song) {
		default: return function handleInput(c) {
			if (c[0] == 'b') {
				store.state.buttons[c[1]].handle(parseInt(c[2]));
			}
		}
	}
}

function song() {
	const args = arrayfromargs(arguments);
	mutate(songToState(song));
	store.inputHandler = songToInputHandler(args[0]);
}

function rcv() {
	const args = arrayfromargs(arguments);
	store.inputHandler(args[0].split('/').slice(1));
}
