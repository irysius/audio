import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as AudioPlayer from './AudioPlayer';
import { ChannelAudio } from './ChannelAudio';
let mount = document.getElementById('mount');
let audioNode = document.getElementById('audio-node') as HTMLAudioElement;
let ac = new AudioContext();
// let player = ChannelAudioPlayer(ac, audioNode);

console.log('test audio audio');

ReactDOM.render(
	<ChannelAudio src="sample.mp3" />, 
	mount);