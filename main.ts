import * as AudioPlayer from './AudioPlayer';
import { ChannelAudioPlayer } from './ChannelAudioPlayer.Element';
let audioNode = document.getElementById('audio-node') as HTMLAudioElement;
let ac = new AudioContext();
let player = ChannelAudioPlayer(ac, audioNode);
(<any>window).player = player;
console.log('test');

// AudioPlayer.createChannel('sample.mp3').then(player => {
// 	console.log('player created 2');
// 	player.onTick(function (currentTime) {
// 		console.log(currentTime);
// 	});
	
// 	(<any>window).player = player;
// });