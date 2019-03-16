export function clamp(min: number, max: number) {
	return function (value: number) {
		if (value < min) { return min; }
		if (value > max) { return max; }
		return value;
	};
}
