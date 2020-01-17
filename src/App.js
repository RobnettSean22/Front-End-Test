import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DV: null,
      SI: []
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

    // const mapStatus = SI.map(status => {
    //   const match = DV.filter(deviceMatch => {
    //     return status.id === deviceMatch.id;
    //   });
    //   console.log(match);
    // });
    return <div></div>;
  }
}

export default App;
