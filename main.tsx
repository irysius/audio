import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChannelAudio } from './ChannelAudio';
import { Interval } from './Section';
let mount = document.getElementById('mount');

let skips = [Interval(6.25, 18.0)];

ReactDOM.render(
	<ChannelAudio src="sample.mp3" skips={skips} />, 
	mount);