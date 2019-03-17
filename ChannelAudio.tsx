import * as React from 'react';
import { AudioChannels, IAudioChannels } from './AudioChannels';

interface Props {
	src: string;
}
interface State {
	volumes: number[];
}

export class ChannelAudio extends React.Component<Props, State> {
	audioElement: React.RefObject<HTMLAudioElement>;
	channels: IAudioChannels;
	constructor(props) {
		super(props);
		this.audioElement = React.createRef();
		this.state = {
			volumes: []
		};
	}
	componentDidMount() {
		this.channels = AudioChannels(this.audioElement.current);
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
		let { volumes } = this.state;
		let volumeInputs = volumes.map((volume, index) => {
			return <div key={index}>
				<input type="range" value={volume} min={0.0} max={1.0} step={0.01} onChange={this.changeVolume(index)}/>
			</div>;
		});
		
		return (<div>
			<audio ref={this.audioElement} src={src} controls></audio>
			<div>{volumeInputs}</div>
		</div>);
	}
}