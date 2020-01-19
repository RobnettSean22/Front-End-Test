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

  matchRender() {
    if (!this.SI) {
      const mapSI = this.DV.map(device => {
        const match = this.SI.filter(stats => {
          return stats.id === device.deviceID;
        });
        const rend = match.map(combine => {
          return (
            <div key={combine.id}>
              <div>
                <img src={combine.thumbnail} alt="" />
              </div>
            </div>
          );
        });
        return rend;
      });
      return mapSI;
    }
  }
  render() {
    const { DV, SI } = this.state;

    console.log(SI);
    console.log(DV);
    console.log(this.matchRender());
    return <div></div>;
  }
}

export default App;
