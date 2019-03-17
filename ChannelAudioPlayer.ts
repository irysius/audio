import { clamp, repeat, formatDuration } from './helpers';
import { Poll } from './Poll';

export interface IChannelAudioPlayer {
	play(when?: number): Promise<void>;
	stop(): void;
	suspend(): Promise<void>;
	resume(): Promise<void>;
	volume(channelIndex: number): number;
	volume(channelIndex: number, value: number): void;
	onTick(callback: TickCallback): void;
}
type TickCallback = (this: AudioContext, currentTime: number) => void;
interface IChannel {
	gainNode?: GainNode;
	volume: number;
}

export function ChannelAudioPlayer(ac: AudioContext, buffer: AudioBuffer): IChannelAudioPlayer {
	let source: AudioBufferSourceNode;
	let channels: IChannel[] = [];
	let channelClamp = clamp(0, buffer.numberOfChannels - 1);
	let currentTimeBase = 0;
	let poll = Poll();
	let _callback: any;
	repeat(buffer.numberOfChannels, () => {
		channels.push({ volume: 1.0 });
	});

	console.log(formatDuration(buffer.duration));

	function resume() {
		return ac.resume().then(() => {
			poll.start();
		});
	}
	function suspend() {
		return ac.suspend().then(() => {
			poll.stop();
		});
	}
	function play(when: number = 0) {
		stop();
		source = ac.createBufferSource();
		source.buffer = buffer;

		let splitter = ac.createChannelSplitter(buffer.numberOfChannels);
		source.connect(splitter);

		let merger = ac.createChannelMerger(buffer.numberOfChannels);

		channels.forEach((channel, index) => {
			channel.gainNode = ac.createGain();
			channel.gainNode.gain.value = channel.volume;
			// splitter (multiple channels) to gain (single channel)
			splitter.connect(channel.gainNode, index);
			// gain (single channel) to merger (multiple channels)
			channel.gainNode.connect(merger, 0, index);
		});

		merger.connect(ac.destination);
		source.start(when);
		return ac.resume().then(() => {
			currentTimeBase = ac.currentTime;
			poll.start();
		});
	}
	function stop() {
		if (source) {
			source.stop(0);
			source = null;
			channels.forEach(channel => {
				channel.gainNode = null;
			});
		}
		poll.stop();
	}
	function volume(channelIndex: number, value?: number) {
		channelIndex = channelClamp(channelIndex);
		if (typeof value === 'number') {
			value = clamp(0.0, 1.0)(value);
			channels[channelIndex].volume = value;
			if (channels[channelIndex].gainNode) {
				channels[channelIndex].gainNode.gain.value = value;
			}
		} else {
			return channels[channelIndex].volume;
		}
	}
	function onTick(callback: TickCallback) {
		_callback = callback.bind(ac);
		poll.off();
		poll.on(tick);
	}
	function tick() {
		_callback(ac.currentTime - currentTimeBase);
	}

	return {
		volume, play, stop, suspend, resume, onTick
	};
}