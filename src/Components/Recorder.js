import React, { Component } from 'react';
import RecorderJS from 'recorder-js';

import { recordAudio, exportBuffer } from '../utilities/audio';

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      recording: false,
      recorder: null
    };
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  async componentDidMount() {
    let stream;

    try {
      stream = await recordAudio();
    } catch (error) {
      // Users browser doesn't support audio.
      console.log(error);
    }

    this.setState({ stream });
  }

  async startRecord() {
    const { stream } = this.state;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new RecorderJS(audioContext);
    recorder.init(stream);

    this.setState(
      {
        recorder,
        recording: true
      },
      () => {
        recorder.start();
      }
    );
  }

  stopRecord() {
    const { recorder } = this.state;

    recorder.stop().then(({ buffer }) => {
      const audio = exportBuffer(buffer[0]);

      // Process the audio here.
      console.log(audio);
    });

    this.setState({
      recording: false
    });
  }

  render() {
    const { recording, stream } = this.state;

    // Don't show record button if their browser doesn't support it.
    if (!stream) {
      return null;
    }

    return (
      <button
        onClick={() => {
          recording ? this.stopRecord() : this.startRecord();
        }}
        >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
    );
  }
}

export default Recorder;
