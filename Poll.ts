export function Poll() {
	let isRunning = false;
	let listeners: Function[] = [];
	function start() {
		isRunning = true;
		tick();
	}
	function tick() {
		if (isRunning) {
			emit();
			// setTimeout(tick, 1000);
			requestAnimationFrame(tick);
		}
	}
	function stop() {
		isRunning = false;
	}
	function emit() {
		listeners.forEach(listener => {
			listener();
		});
	}
	function on(callback: Function) {
		listeners.push(callback);
	}
	function off(callback?: Function) {
		if (!callback) {
			listeners = [];
		} else {
			listeners = listeners.filter(listener => {
				return listener != callback;
			});
		}
	}

	return {
		start, stop, on, off
	};
}