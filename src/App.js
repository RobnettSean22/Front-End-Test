import React, { Component } from "react";
import Devices from "./Components/Devices/Devices";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Devices />
      </div>
    );
  }
}

export default App;
