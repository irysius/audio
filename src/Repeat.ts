import { IInterval } from "./Section";

export interface IRepeat {
	cleanup(): void;
}

// Note: Should logically only allow a single repeat.
// Using Skips with Repeat can be dangerous...
// Maybe need an interval rules engine.

export function Repeat(audioElement: HTMLAudioElement, interval: IInterval) {
	audioElement.addEventListener('timeupdate', onTimeUpdate);

	function onTimeUpdate() {
		if (interval && !interval.contains(audioElement.currentTime)) {
			audioElement.currentTime = interval.min;
		}
	}

	function cleanup() {
		audioElement.removeEventListener('timeupdate', onTimeUpdate);
	}

	return {
		cleanup
	};
}

