import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AudioPlayer } from './src/AudioPlayer';
import { Interval } from './src/Section';
let mount = document.getElementById('mount');

let skips = [Interval(6.25, 18.0)];

ReactDOM.render(
	<AudioPlayer src="sample.mp3" skips={skips} />, 
	mount);