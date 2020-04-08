import * as React from 'react';
import { AudioChannels, IAudioChannels } from './Channels';
import { Skips, ISkips } from './Skips';
import { IInterval, Interval } from './Section';
import { Repeat, IRepeat } from './Repeat';

interface Props {
	src: string;
	skips?: IInterval[];
}
interface State {
	volumes: number[];
}

export class AudioPlayer extends React.Component<Props, State> {
	audioElement: React.RefObject<HTMLAudioElement>;
	channels: IAudioChannels;
	skips: ISkips;
	repeat: IRepeat;
	constructor(props) {
		super(props);
		this.audioElement = React.createRef();
		
		this.state = {
			volumes: []
		};
	}
	componentDidMount() {
		document.addEventListener('click', this.waitForInteraction);
	}
	componentWillUnmount() {
		this.skips.cleanup();
		this.repeat.cleanup();
	}

	waitForInteraction = () => {
		document.removeEventListener('click', this.waitForInteraction);
		this.setup();
	}

	setup = () => {
		this.channels = AudioChannels(this.audioElement.current);
		this.skips = Skips(this.audioElement.current);
		// let r = Interval(60.50, 82.00); // puppet ... pawn 1st time
		this.repeat = Repeat(this.audioElement.current, null);
		// Note: this.audioElement.current contains all the 
		// necessary calls present in the default controls, such as:
		// .play()
		// .pause()
		// .currentTime
		// .loop
		// .volume

		let { skips: propSkips } = this.props;

		this.skips.set(propSkips);
		
		this.setState({
			volumes: this.channels.volume()
		});
	}

	changeVolume = (index: number) => {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			let value = parseFloat(event.currentTarget.value);
			this.channels.volume(index, value);
			this.setState({
				volumes: this.channels.volume()
			});
		};
	}

	render() {
		let { src } = this.props;
		console.log(src);
		let { volumes } = this.state;
		let volumeInputs = volumes.map((volume, index) => {
			return <div key={index}>
				<span>Channel #{index} volume: </span>
				<input type="range" value={volume} min={0.0} max={1.0} step={0.01} onChange={this.changeVolume(index)}/>
			</div>;
		});
		
		return (<div>
			<audio ref={this.audioElement} src={src} controls></audio>
			<div>{volumeInputs}</div>
		</div>);
	}
}