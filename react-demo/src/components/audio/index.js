import React, { Component } from 'react';
import './style.scss';

class Audio extends Component {
  render() {
    const audio = this.props.audio;
    return (
      <div className="audio">
        <audio src={audio.src} controls={audio.controls} />
      </div>
    );
  }
}

export default Audio;
