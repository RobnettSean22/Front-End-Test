import React, { Component } from "react";
import "./Devices.scss";
import axios from "axios";

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devicesInventory: [],
      statusInventory: [],
      searchFilter: ""
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
    const { deviceInventory, statusInventory, searchFilter } = this.state;
    console.log(deviceInventory, statusInventory);

    return (
      <div className="enclosure">
        <div className="title">Your Camera</div>
        <div className="search">
          <input
            value={searchFilter}
            onChange={e => this.setState({ searchFilter: e.target.value })}
          />
        </div>
        {statusInventory.length > 1 &&
          deviceInventory.map(dVices => {
            const matchId = statusInventory.filter(deviceStatus => {
              return dVices.id === deviceStatus.deviceId;
            });
            console.log(2222, matchId);
            const linkThem = matchId.map(together => {
              console.log(4444, together);
              return (
                <div className="camera-container" key={together.deviceId}>
                  <div className="pic-capsule">
                    <img src={together.thumbnail} alt="" />
                  </div>
                  <div>
                    <div class={together.active ? "active" : "inactive"}>
                      <h3>Active</h3>
                      <h1>{dVices.name}</h1>
                    </div>
                  </div>
                </div>
              );
            });

            return linkThem;
          })}
      </div>
    );
  }
}

export default Devices;
