import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DV: null,
      SI: null
    };
  }
  componentDidMount() {
    this.viewAllDevices();
    this.viewAllStatus();
  }
  viewAllDevices() {
    axios.get("/api/all_devices").then(response => {
      this.setState({
        DV: response.data
      });
    });
  }
  viewAllStatus() {
    axios.get("/api/all_status").then(response => {
      this.setState({
        SI: response.data
      });
    });
  }

  render() {
    const { DV, SI } = this.state;

    return <div>run</div>;
  }
}

export default App;
