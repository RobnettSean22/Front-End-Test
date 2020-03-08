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
      camConnect: false,

      reverseName: null,
      popUp: "closed"
    };

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

  idSwitch = () => {
    this.setState({
      camConnect: false,
      reverseId: false,

      reverseName: null,
      popUp: "closed",

      deviceInventory: this.state.deviceInventory.sort((a, b) => a.id - b.id)
    });
  };

  connectSwitch = () => {
    this.setState({
      camConnect: true,

      reverseName: null,
      popUp: "closed",
      statusInventory: this.state.statusInventory.sort(
        (a, b) => b.active - a.active
      )
    });
  };
  nameSwitch() {
    this.setState({
      camConnect: false,
      reverseName: false,
      popUp: "closed",
      deviceInventory: this.state.deviceInventory.sort((a, b) => {
        const abc = this.state.camID && this.state.camConnect ? -1 : 1;
        return abc * a.name.localeCompare(b.name);
      })
    });
  }

  popUpControll = () => {
    this.setState({
      popUp: "open"
    });
  };
  exit = () => {
    this.setState({
      popUp: "closed"
    });
  };

  render() {
    const {
      deviceInventory,
      statusInventory,
      searchFilter,
      camConnect,
      reverseName,
      popUp
    } = this.state;

    console.log(8282, statusInventory, deviceInventory.devices);

    return (
      <div className="enclose">
        <div className="icon"></div>
        <div className="title">
          <h3>Camers</h3>
          <h5>Total Devices: {statusInventory.length}</h5>
        </div>
        <div className="search">
          <input
            placeholder="Search by Name or Id..."
            value={searchFilter}
            onChange={e => this.setState({ searchFilter: e.target.value })}
          />

          <div className="toggle">
            <button onClick={this.popUpControll}>{"Sort by:"}</button>

            <div className={popUp === "open" ? "popup-contain" : "hidden"}>
              <h1 onClick={this.exit}>X</h1>
              <div className="name" onClick={this.nameSwitch}>
                By Name
              </div>
              <div className="connect" onClick={this.connectSwitch}>
                By Status
              </div>
              <div className="id" onClick={this.idSwitch}>
                By Id
              </div>
            </div>
          </div>
        </div>

        <div className="grid-enclosure">
          <div className="camera-capsule">
            {statusInventory.length > 1 &&
              camConnect === false &&
              deviceInventory.map(dVices => {
                const matchId = statusInventory.filter(deviceStatus => {
                  return (
                    (deviceStatus.deviceId === dVices.id &&
                      dVices.name
                        .toUpperCase()
                        .indexOf(searchFilter.toUpperCase()) !== -1) ||
                    (dVices.id === deviceStatus.deviceId &&
                      deviceStatus.deviceId.toString().indexOf(searchFilter) !==
                        -1)
                  );
                });

                const mapMatched = matchId.map(order => {
                  return (
                    <div className="camera-container" key={order.deviceId}>
                      <div className="pic-capsule">
                        <img src={order.thumbnail} alt="" />
                      </div>
                      <div className="status-n-name">
                        <div className={order.active ? "active" : "inactive"}>
                          <h3>{order.active ? "Active" : "Inactive"}</h3>
                          <h1>{dVices.name}</h1>
                        </div>
                      </div>
                    </div>
                  );
                });

                return mapMatched;
              })}
            {deviceInventory.length > 1 &&
              camConnect === true &&
              statusInventory.map(deviceStatus => {
                const matchId = deviceInventory.filter(dVices => {
                  return (
                    (deviceStatus.deviceId === dVices.id &&
                      dVices.name
                        .toUpperCase()
                        .indexOf(searchFilter.toUpperCase()) !== -1) ||
                    (dVices.id === deviceStatus.deviceId &&
                      deviceStatus.deviceId.toString().indexOf(searchFilter) !==
                        -1)
                  );
                });

                const mapMatched = matchId.map(order => {
                  return (
                    <div className="camera-container" key={order.id}>
                      <div className="pic-capsule">
                        <img src={deviceStatus.thumbnail} alt="" />
                      </div>
                      <div className="status-n-name">
                        <div
                          className={
                            deviceStatus.active ? "active" : "inactive"
                          }
                        >
                          <h3>{deviceStatus.active ? "Active" : "Inactive"}</h3>
                          <h1>{order.name}</h1>
                        </div>
                      </div>
                    </div>
                  );
                });

                return mapMatched;
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Devices;
