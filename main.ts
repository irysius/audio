import * as AudioPlayer from './AudioPlayer';
let audioNode = document.getElementById('audio-node') as HTMLAudioElement;

AudioPlayer.createChannel('sample.mp3').then(player => {
	console.log('player created 2');
	player.onTick(function (currentTime) {
		console.log(currentTime);
	});
	
	(<any>window).player = player;
});