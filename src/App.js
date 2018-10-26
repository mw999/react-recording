import React, { Component } from 'react';

import Recorder from './Components/Recorder';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Recording in React</h1>
        <Recorder />
      </div>
    );
  }
}

export default App;
