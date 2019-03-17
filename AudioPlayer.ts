import { 
	IBasicAudioPlayer, BasicAudioPlayer 
} from './BasicAudioPlayer';
import { IChannelAudioPlayer, ChannelAudioPlayer } from './ChannelAudioPlayer';

type AudioPlayerFactory<T = any> = (ac: AudioContext, data: AudioBuffer) => T;

function create<T>(url: string, factory: AudioPlayerFactory<T>) {
	return fetch(url).then(response => {	
		return response.arrayBuffer();
	}).then(buffer => {
		let ac = new AudioContext();
		(<any>window).ac = ac;
		return ac.decodeAudioData(buffer).then(data => {
			return factory(ac, data);
		});
	});
}

export function createBasic(url: string) {
	return create<IBasicAudioPlayer>(url, BasicAudioPlayer);
}

export function createChannel(url: string) {
	return create<IChannelAudioPlayer>(url, ChannelAudioPlayer);
}