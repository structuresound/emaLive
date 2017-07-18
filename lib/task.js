exports.setDelay = function setDelay(time, func) {
	var tsk = new Task(func, this);
	tsk.interval = time;
	tsk.repeat(1);
	return tsk;
}

exports.setInterval = function setInterval(time, func) {
	var tsk = new Task(func, this);
	tsk.interval = time;
	tsk.repeat(-1);
	return tsk;
}

exports.clearInterval = function clearInterval(task) {
	if (task) {
		task.cancel();
	}
}