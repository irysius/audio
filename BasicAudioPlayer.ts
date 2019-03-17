import { clamp } from './helpers';

export interface IBasicAudioPlayer {
	play(): Promise<void>;
	stop(): void;
	suspend(): Promise<void>;
	resume(): Promise<void>;
	volume(): number;
	volume(value: number): void;
}

export function BasicAudioPlayer(ac: AudioContext, buffer: AudioBuffer): IBasicAudioPlayer {
	let source: AudioBufferSourceNode;
	let gainNode: GainNode;
	let _volume: number = 1.0;
	
	function play() {
		stop();
		source = ac.createBufferSource();
		source.buffer = buffer;
		gainNode = ac.createGain();
		source.connect(gainNode);
		gainNode.connect(ac.destination);
		gainNode.gain.value = _volume;
		source.start(0);
		return ac.resume();
	}
	function stop() {
		if (source) {
			source.stop(0);
			source = null;
			gainNode = null;
		}
	}
	function resume() {
		return ac.resume();
	}
	function suspend() {
		return ac.suspend();
	}
	function volume(value?: number) {
		if (typeof value === 'number') {
			value = clamp(0.0, 1.0)(value);
			_volume = value;
			if (gainNode) {
				gainNode.gain.value = _volume;
			}
		} else {
			return _volume;
		}
	}

	return {
		volume, play, stop, suspend, resume
	};
}
