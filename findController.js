inlets = 1;
outlets = 4;

function setDelay(time, func) {
	var tsk = new Task(func, this);
	tsk.interval = time;
	tsk.repeat(1);
	return tsk;
}

function setInterval(time, func) {
	var tsk = new Task(func, this);
	tsk.interval = time;
	tsk.repeat(-1);
	return tsk;
}

function clearInterval(task) {
	if (task) {
		task.cancel();
	}
}

if (jsarguments.length > 1)
	myval = jsarguments[1];


function status(available) {
	outlet(1, available);
}

function action(str) {
	outlet(2, str);
}

function log(str) {
	outlet(3, str);
}

function loadBand(){
	log("");
}
var searchTimer;

function lost() {
	var msg = "";
	status(0);
	searchTimer = setInterval(500, function () {
		msg += ".";
		log(msg);
		action('print');
	});
}

function found() {
	clearInterval(searchTimer);
	searchTimer = undefined;
}

// MAIN FUNCTIONS

function port() {
	var discovered = false;
	const args = arrayfromargs(arguments);
	args.forEach(function (device) {
		if (typeof (device) === 'string') {
			if (device.indexOf('usbmodem') != -1) {
				log(device);
				outlet(0, "port", device);
				found();
				discovered = true;
				status(1);
			}
		}
	})
	if (!discovered && !searchTimer) {
		lost();
	}
}

function write(){
	log("wrote " + arrayfromargs(arguments) + " bytes");
}

function read() {
	const args = arrayfromargs(arguments);
	if (args[0] == -1) {
		if (!searchTimer) {

			lost();
		}
	}
}
