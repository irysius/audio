import * as BasicAudioPlayer from './BasicAudioPlayer';
let audioNode = document.getElementById('audio-node') as HTMLAudioElement;

BasicAudioPlayer.create('sample.mp3').then(player => {
	console.log('player created');
	(<any>window).player = player;
});