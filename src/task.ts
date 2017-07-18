/// <reference path="@types/index.d.ts" />

export function setDelay(time, func) {
	var tsk = new Task(func, max);
	tsk.interval = time;
	tsk.repeat(1);
	return tsk;
}

export function setInterval(time, func) {
	var tsk = new Task(func, max);
	tsk.interval = time;
	tsk.repeat(-1);
	return tsk;
}

export function clearInterval(task) {
	if (task) {
		task.cancel();
	}
}