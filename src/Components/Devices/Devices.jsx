import React, { Component } from "react";
import axios from "axios";

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devicesInventory: [],
      statusInventory: []
    };
  }
  componentDidMount() {
    this.viewAllDevices();
    this.viewAllStatus();
  }
  viewAllDevices() {
    axios.get("/api/all_devices").then(response => {
      this.setState({
        deviceInventory: response.data.devices
      });
    });
  }
  viewAllStatus() {
    axios.get("/api/all_status").then(response => {
      this.setState({
        statusInventory: response.data.status
      });
    });
  }

  render() {
    const { deviceInventory, statusInventory } = this.state;
    console.log(deviceInventory, statusInventory);

    return (
      <div>
        {statusInventory.length > 1 &&
          deviceInventory.map(dVices => {
            const matchId = statusInventory.filter(deviceStatus => {
              return dVices.id === deviceStatus.deviceId;
            });
            console.log(2222, matchId);
            const linkThem = matchId.map(together => {
              return <div key={together.Id}>{together.thumbnail}</div>;
            });
            return linkThem;
          })}
      </div>
    );
  }
}

export default Devices;
