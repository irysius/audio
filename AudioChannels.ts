import { repeat, clamp } from './helpers';

export interface IAudioChannels {
	volume(): number[];
	volume(channelIndex: number): number;
	volume(channelIndex: number, value: number): void;
}

interface IChannel {
	gainNode?: GainNode;
	volume: number;
}

export function AudioChannels(audioElement: HTMLAudioElement): IAudioChannels {
	let ac = new AudioContext();
	let source = ac.createMediaElementSource(audioElement);
	
	let channels: IChannel[] = [];
	let channelClamp = clamp(0, source.channelCount - 1);

	repeat(source.channelCount, () => {
		channels.push({ volume: 1.0 });
	});

	let splitter = ac.createChannelSplitter(source.channelCount);
	source.connect(splitter);

	let merger = ac.createChannelMerger(source.channelCount);

	channels.forEach((channel, index) => {
		channel.gainNode = ac.createGain();
		channel.gainNode.gain.value = channel.volume;
		// splitter (multiple channels) to gain (single channel)
		splitter.connect(channel.gainNode, index);
		// gain (single channel) to merger (multiple channels)
		channel.gainNode.connect(merger, 0, index);
	});

	merger.connect(ac.destination);

	function volume(channelIndex?: number, value?: number): any {
		if (typeof channelIndex === 'number') {
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
		} else {
			return channels.map(channel => channel.volume);
		}
	}

	return { volume };
}