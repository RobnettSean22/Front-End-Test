import React, { Component } from "react";
import "./Devices.scss";
import axios from "axios";

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devicesInventory: [],
      statusInventory: [],
      searchFilter: "",
      byName: "name",
      byStatus: "status",
      byId: "id"
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

  changeToStatus() {
    this.setState({
      byName: "status"
    });
  }
  changeToName() {
    this.setState({
      byName: "name"
    });
  }
  changeToId() {
    this.setState({
      byName: "id"
    });
  }

  render() {
    const {
      deviceInventory,
      statusInventory,
      searchFilter,
      byName,
      byStatus,
      byId
    } = this.state;
    console.log(8282, statusInventory);

    return (
      <div className="enclosure">
        <div className="title">Your Camera</div>
        <div className="search">
          <input
            value={searchFilter}
            onChange={e => this.setState({ searchFilter: e.target.value })}
          />
          <select className="">
            <option value="">Search Method</option>
            <option value={byName}>By Name</option>
            <option value={byStatus}>By Status</option>
            <option value={byId}>By Id</option>
          </select>
        </div>

        <div className="grid-enclosure">
          <div className="camera-capsule">
            {statusInventory.length > 1 &&
              deviceInventory.map(dVices => {
                const matchId = statusInventory.filter(deviceStatus => {
                  if (byName) {
                    return (
                      dVices.id === deviceStatus.deviceId &&
                      dVices.name
                        .toUpperCase()
                        .indexOf(searchFilter.toUpperCase()) !== -1
                    );
                  } else if (byStatus) {
                    return (
                      dVices.id === deviceStatus.deviceId &&
                      deviceStatus.active.indexOf(searchFilter) !== -1
                    );
                  } else {
                    return (
                      dVices.id === deviceStatus.deviceId &&
                      deviceStatus.deviceId
                        .toString("")
                        .indexOf(searchFilter) !== -1
                    );
                  }
                });
                console.log(2222, matchId);
                const linkThem = matchId.map(together => {
                  console.log(4444, together);
                  return (
                    <div className="camera-container" key={together.deviceId}>
                      <div className="pic-capsule">
                        <img src={together.thumbnail} alt="" />
                      </div>
                      <div className="status-n-name">
                        <div class={together.active ? "active" : "inactive"}>
                          <h3>{together.active ? "Active" : "Inactive"}</h3>
                          <h1>{dVices.name}</h1>
                        </div>
                      </div>
                    </div>
                  );
                });

                return linkThem;
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Devices;
