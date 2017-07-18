inlets = 1;
outlets = 10;

function setLed(num, val) {
  const xpath = '/led/' + num + '/' + val;
  for (var x = 0; x < xpath.length; x++){
    var c = xpath.charCodeAt(x);
    outlet(0, c);
  }
  outlet(0, 13);
}


function draw() {
	const args = arrayfromargs(arguments);
	if (args[0]) {
		var c = args[0].split('/');
		if (c[1] == 'led'){
			var ledNum = c[2];
			var onOff = c[3];
			outlet(0, args[0]);
			outlet(parseInt(ledNum) + 1, parseInt(onOff));
		}
		else if (c[1] == 'ped'){
			var key = c[2];
			var val = c[3];
			outlet(parseInt(key) + 8, parseInt(val));
		}
		if (c[1] == 'pgm'){
			var key = c[2];
			outlet(0, args[0]);
		}
	}
}
