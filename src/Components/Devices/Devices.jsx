import React, { Component } from "react";
import "./Devices.scss";
import axios from "axios";
import Logo from "./Logo.svg";
import Sorting from "./Sorting.svg";

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceInventory: [],
      statusInventory: [],
      searchFilter: "",
      sort: "none",
      camConnect: false,
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
      sort: "id",
      popUp: "closed",

      deviceInventory: this.state.deviceInventory.sort((a, b) => a.id - b.id)
    });
  };

  connectSwitch = () => {
    this.setState({
      camConnect: true,
      sort: "status",
      popUp: "closed",
      statusInventory: this.state.statusInventory.sort(
        (a, b) => b.active - a.active
      )
    });
  };
  nameSwitch() {
    this.setState({
      camConnect: false,
      sort: "name",
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
      sort,
      popUp
    } = this.state;

    console.log(8282, statusInventory, deviceInventory.devices);

    return (
      <div className="enclose">
        <div className="icon">
          <img src={Logo} alt="" />
        </div>
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
            <div className="pop-button" onClick={this.popUpControll}>
              <img src={Sorting} alt="" />
              <h3 className={sort === "none" ? "visible" : "hidden"}>
                Sort by...
              </h3>
              <h3 className={sort === "name" ? "visible" : "hidden"}>
                Sort by:Name
              </h3>
              <h3 className={sort === "id" ? "visible" : "hidden"}>
                Sort by:Id
              </h3>
              <h3 className={sort === "status" ? "visible" : "hidden"}>
                Sort by:Status
              </h3>
            </div>

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
