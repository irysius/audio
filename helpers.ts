export function clamp(min: number, max: number) {
	return function (value: number) {
		if (value < min) { return min; }
		if (value > max) { return max; }
		return value;
	};
}

export function repeat(times: number, callback: Function) {
	for (let i = 0; i < times; ++i) {
		callback(i);
	}
}

export function formatDuration(seconds: number) {
	let _seconds = Math.floor(seconds % 60);
	let minute = Math.floor(seconds / 60);
	return `${minute}:${_seconds}`;
}