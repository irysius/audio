export interface IInterval {
	min: number;
	max: number;
	contains(value: number): boolean;
}
export function Interval(min: number, max: number): IInterval {
	function contains(value: number) {
		return min < value && value < max;
	}
	
	return {
		min, max, contains
	};
}
export interface ISection extends IInterval {
	name: string;
}

export function Section(name: string, min: number, max: number): ISection {
	function contains(value: number) {
		return min < value && value < max;
	}
	
	return {
		name, min, max, contains
	};
}