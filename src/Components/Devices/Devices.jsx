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
      reverseId: null,
      reverseConnect: null,
      reverseName: null,
      popUp: "closed"
    };

    this.connectSwitch = this.connectSwitch.bind(this);
    this.idSwitch = this.idSwitch.bind(this);
    this.nameSwitch = this.nameSwitch.bind(this);
    this.connectReverse = this.connectReverse.bind(this);
    this.idReverse = this.idReverse.bind(this);
    this.nameReverse = this.nameReverse.bind(this);
    this.connectBackTo = this.connectBackTo.bind(this);
    this.idBackTo = this.idBackTo.bind(this);
    this.nameBackTo = this.nameBackTo.bind(this);
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
      reverseConnect: null,
      reverseName: null,
      popUp: "closed",

      deviceInventory: this.state.deviceInventory.sort((a, b) => a.id - b.id)
    });
  };

  connectSwitch = () => {
    this.setState({
      camConnect: true,
      reverseConnect: false,
      reverseId: null,
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
      reverseId: null,
      reverseConnect: null,
      popUp: "closed",
      deviceInventory: this.state.deviceInventory.sort((a, b) => {
        const abc = this.state.camID && this.state.camConnect ? -1 : 1;
        return abc * a.name.localeCompare(b.name);
      })
    });
  }
  idReverse = () => {
    this.setState({
      reverseId: true,
      deviceInventory: this.state.deviceInventory.sort((a, b) => b.id - a.id)
    });
  };

  connectReverse = () => {
    this.setState({
      reverseConnect: true,
      statusInventory: this.state.statusInventory.sort(
        (a, b) => a.active - b.active
      )
    });
  };
  nameReverse() {
    this.setState({
      reverseName: true,
      deviceInventory: this.state.deviceInventory.sort((a, b) => {
        const abc = this.state.camID && this.state.camConnect ? -1 : 1;
        return abc * b.name.localeCompare(a.name);
      })
    });
  }
  idBackTo = () => {
    this.setState({
      reverseId: false,
      deviceInventory: this.state.deviceInventory.sort((a, b) => a.id - b.id)
    });
  };

  connectBackTo = () => {
    this.setState({
      reverseConnect: false,
      statusInventory: this.state.statusInventory.sort(
        (a, b) => b.active - a.active
      )
    });
  };
  nameBackTo() {
    this.setState({
      reverseName: false,
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

  render() {
    const {
      deviceInventory,
      statusInventory,
      searchFilter,
      camConnect,
      reverseId,
      reverseName,
      reverseConnect,
      popUp
    } = this.state;

    console.log(8282, statusInventory, deviceInventory.devices);

    return (
      <div className="enclose">
        <div className="title">Your Camera</div>
        <div className="search">
          <input
            placeholder="Search by Name or Id"
            value={searchFilter}
            onChange={e => this.setState({ searchFilter: e.target.value })}
          />

          <div className="reverse">
            <button
              className={reverseId === true ? "show" : "hidden"}
              onClick={this.idBackTo}
            >
              1 to 10
            </button>
            <button
              className={reverseName === true ? "show" : "hidden"}
              onClick={this.nameBackTo}
            >
              A to Z
            </button>
            <button
              className={reverseConnect === true ? "show" : "hidden"}
              onClick={this.connectBackTo}
            >
              On Off
            </button>
            <button
              className={reverseId === false ? "show" : "hidden"}
              onClick={this.idReverse}
            >
              10 to 1
            </button>
            <button
              className={reverseName === false ? "show" : "hidden"}
              onClick={this.nameReverse}
            >
              Z to A
            </button>
            <button
              className={reverseConnect === false ? "show" : "hidden"}
              onClick={this.connectReverse}
            >
              Off On
            </button>
          </div>
          <div className="toggle">
            <div onClick={this.popUpControll}>
              <h4>Sort By...</h4>
            </div>
            <div className={popUp === "open" ? "popup-contain" : "hidden"}>
              <div onClick={this.nameSwitch}>By Name</div>
              <div onClick={this.connectSwitch}>By Status</div>
              <div onClick={this.idSwitch}>By Id</div>
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
