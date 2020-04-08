interface IData {
	min: number;
	max: number;
	name: string;
}

// Goals:
// Register a set of data
// data may get rendered out to a list
// you can choose to select a single segment to repeat
// or contiguous segments to repeat
// or more than one segment to skip
interface ISegment {
	min: number;
	max: number;
	name?: string;
}
interface RepeatRange {
	start: number;
	end: number;
}
type RepeatIndex = number;
type SkipIndex = number;

interface IView {
	segments: ISegment[];
	skips: SkipIndex[];
	repeat: RepeatIndex|RepeatRange;
	max: number;
}
type Divide = number;

// should be non overlapping.
interface ISortedSet {
	add(value: number): void;
	remove(value: number): void;
	clear(): void;
	state(): number[];
}
function SortedSet(): ISortedSet {
	let values: number[] = [];
	function add(value: number) {
		if (values.indexOf(value) == -1) {
			values.push(value);
			values.sort();
		}
	}
	function remove(value: number) {
		values = values.filter(x => x != value);
	}
	function clear() {
		values = [];
	}
	function state(): number[] {
		return values;
	}

	return { add, remove, clear, state };
}

function Manager() {
	let divides: ISortedSet = SortedSet();
	let max: number;
	let repeats: RepeatIndex|RepeatRange = -1;
	let skips: SkipIndex[] = [];

	function insertDivide(divide: number) {
		divides.add(divide);
	}
	function removeDivide(divide: number) {
		divides.remove(divide);
	}

	// a skip cannot be a repeat 
	function toggleRepeat(index: number) {

	}
	function toggleSkip(index: number) {

	}
	function getState() {
		let ds = divides.state();
		let segments = [];
		for (let i = 0; i < ds.length; ++i) {
			let min = i === 0 ? 0 : ds[i - 1];
			segments.push({ min, max: ds[i] });
		}
		
	}


}



