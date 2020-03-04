import React, { Component } from "react";
import "./Devices.scss";
import axios from "axios";

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceInventory: [],
      statusInventory: [],
      searchFilter: "",

      camId: false,
      camConnect: false
    };
    // this.toggleByName = this.toggleByName.bind(this);
    // this.toggleById = this.toggleById.bind(this);
    this.connectSwitch = this.connectSwitch.bind(this);
    this.idSwitch = this.idSwitch.bind(this);
    this.nameSwitch = this.nameSwitch.bind(this);
  }
  componentDidMount() {
    this.viewAllDevices();
    this.viewAllStatus();
  }
  viewAllDevices() {
    axios.get("/api/all_devices").then(response => {
      this.setState({
        deviceInventory: response.data.devices.sort((a, b) => {
          return a.name - b.name;
        })
      });
      console.log(3030, this.state.deviceInventory);
    });
  }
  viewAllStatus() {
    axios.get("/api/all_status").then(response => {
      this.setState({
        statusInventory: response.data.status
      });
    });
  }

  // toggleById() {
  //   this.setState({
  //     deviceInventory: this.state.deviceInventory.sort((a, b) => a.id > b.id)
  //   });
  // }
  // toggleByName() {
  //   this.setState({
  //     deviceInventory: this.state.deviceInventory.sort(
  //       (a, b) => a.name > b.name
  //     )
  //   });
  //   console.log(9001, this.state.deviceInventory.name);
  // }

  idSwitch = () => {
    this.setState({
      camId: true,
      camConnect: false
    });
  };

  connectSwitch = () => {
    this.setState({
      camId: false,
      camConnect: true
    });
  };
  nameSwitch() {
    this.setState({
      camId: false,
      camConnect: false
    });
  }

  compare = (a, b) => {
    return a - b;
  };

  render() {
    const {
      deviceInventory,
      statusInventory,
      searchFilter,
      camConnect,
      camId
    } = this.state;
    const { compare } = this;
    console.log(8282, statusInventory, deviceInventory.devices);

    return (
      <div className="enclosure">
        <div className="title">Your Camera</div>
        <div className="search">
          <input
            placeholder="Search by Name or Id"
            value={searchFilter}
            onChange={e => this.setState({ searchFilter: e.target.value })}
          />
          <div>
            <div onClick={this.nameSwitch}>By Name</div>
            <div onClick={this.connectSwitch}>By Status</div>
            <div onClick={this.idSwitch}>By Id</div>
          </div>
        </div>

        <div className="grid-enclosure">
          <div className="camera-capsule">
            {statusInventory.length > 1 &&
              deviceInventory.map(dVices => {
                const matchId = statusInventory.filter(deviceStatus => {
                  return (
                    (dVices.id === deviceStatus.deviceId &&
                      dVices.name
                        .toUpperCase()
                        .indexOf(searchFilter.toUpperCase()) !== -1) ||
                    (dVices.id === deviceStatus.deviceId &&
                      deviceStatus.deviceId.toString().indexOf(searchFilter) !==
                        -1)
                  );
                });
                console.log(2222, matchId);
                if (camId) {
                  const forId = matchId
                    .sort((a, b) => {
                      return a.deviceId > b.deviceId;
                    })
                    .map((order, index) => {
                      return (
                        <div className="camera-container" key={index}>
                          <div className="pic-capsule">
                            <img src={order.thumbnail} alt="" />
                          </div>
                          <div className="status-n-name">
                            <div
                              className={order.active ? "active" : "inactive"}
                            >
                              <h3>{order.active ? "Active" : "Inactive"}</h3>
                              <h1>{dVices.name}</h1>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  return forId;
                } else if (camConnect) {
                  const forActive = matchId
                    .sort((a, b) => a.active > b.active)
                    .map((activeOrder, index) => {
                      return (
                        <div className="camera-container" key={index}>
                          <div className="pic-capsule">
                            <img src={activeOrder.thumbnail} alt="" />
                          </div>
                          <div className="status-n-name">
                            <div
                              className={
                                activeOrder.active ? "active" : "inactive"
                              }
                            >
                              <h3>
                                {activeOrder.active ? "Active" : "Inactive"}
                              </h3>
                              <h1>{dVices.name}</h1>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  return forActive;
                } else {
                  const forName = matchId
                    .sort()

                    .map((together, index) => {
                      console.log(4444, together);
                      return (
                        <div className="camera-container" key={index}>
                          <div className="pic-capsule">
                            <img src={together.thumbnail} alt="" />
                          </div>
                          <div className="status-n-name">
                            <div
                              className={
                                together.active ? "active" : "inactive"
                              }
                            >
                              <h3>{together.active ? "Active" : "Inactive"}</h3>
                              <h1>{dVices.name}</h1>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  return forName;
                }
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Devices;
