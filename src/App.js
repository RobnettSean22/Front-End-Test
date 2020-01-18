import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DV: [],
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
        DV: response.data.devices
      });
    });
  }
  viewAllStatus() {
    axios.get("/api/all_status").then(response => {
      this.setState({
        SI: response.data.status
      });
    });
  }

  render() {
    const { DV, SI } = this.state;
    console.log(DV);
    const mapDV = DV.map(devices => {
      return devices.id;
    });
    // const mapStatus = this.SI.map(status => {
    //   const match = this.DV.filter(deviceMatch => {
    //     return status.id === deviceMatch.id;
    //   });
    // });
    return <div>{mapDV}</div>;
  }
}

export default App;
