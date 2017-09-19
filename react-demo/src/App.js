import React, { Component } from 'react';
import '@/assets/css/App.scss';
import logo from '@/assets/img/logo.svg';
import Audio from '@/components/audio';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: {
        src: 'http://audio-10004025.cos.myqcloud.com/movie/C400001U0Xmc0PIlYu.mp4',
        controls: false
      }
    };
  }

  switchControls = () => {
    this.setState({
      audio: {
        src: 'http://audio-10004025.cos.myqcloud.com/movie/C400001U0Xmc0PIlYu.mp4',
        controls: !this.state.audio.controls
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Audio audio={this.state.audio} />
        <button onClick={this.switchControls}>{this.state.audio.controls ? '关闭控制' : '打开控制'}</button>
      </div>
    );
  }
}

export default App;
