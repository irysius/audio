import { IInterval } from "./Section";

export interface ISkips {
	cleanup(): void;
	clear(): void;
	set(values: IInterval[]): void;
	append(value: IInterval): void;
}

export function Skips(audioElement: HTMLAudioElement): ISkips {
	audioElement.addEventListener('timeupdate', onTimeUpdate);
	let intervals: IInterval[] = [];
	function onTimeUpdate() {
		for (let i = 0; i < intervals.length; ++i) {
			let interval = intervals[i];
			if (interval.contains(audioElement.currentTime)) {
				audioElement.currentTime = interval.max;
				break;
			}
		}
	}

	function cleanup() {
		audioElement.removeEventListener('timeupdate', onTimeUpdate);
	}

	function clear() {
		intervals = [];
	}
	function set(values: IInterval[]) {
		intervals = (values || []);
	}
	function append(value: IInterval) {
		intervals.push(value);
	}

	return {
		cleanup, clear, set, append
	};
}