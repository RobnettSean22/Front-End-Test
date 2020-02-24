import React, { Component } from "react";
import Devices from "./Components/Devices/Devices";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DV: [],
      SI: null
    };
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
