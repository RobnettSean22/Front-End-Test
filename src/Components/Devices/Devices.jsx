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
      reverseId: false,
      reverseConnect: false,
      reverseName: false
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

      deviceInventory: this.state.deviceInventory.sort((a, b) => a.id - b.id)
    });
  };

  connectSwitch = () => {
    this.setState({
      camConnect: true,
      statusInventory: this.state.statusInventory.sort(
        (a, b) => b.active - a.active
      )
    });
  };
  nameSwitch() {
    this.setState({
      camConnect: false,
      deviceInventory: this.state.deviceInventory.sort((a, b) => {
        const abc = this.state.camID && this.state.camConnect ? -1 : 1;
        return abc * a.name.localeCompare(b.name);
      })
    });
  }
  idReverse = () => {
    this.setState({
      deviceInventory: this.state.deviceInventory.sort((a, b) => b.id - a.id)
    });
  };

  connectReverse = () => {
    this.setState({
      statusInventory: this.state.statusInventory.sort(
        (a, b) => a.active - b.active
      )
    });
  };
  nameReverse() {
    this.setState({
      deviceInventory: this.state.deviceInventory.sort((a, b) => {
        const abc = this.state.camID && this.state.camConnect ? -1 : 1;
        return abc * b.name.localeCompare(a.name);
      })
    });
  }
  idBackTo = () => {
    this.setState({
      deviceInventory: this.state.deviceInventory.sort((a, b) => a.id - b.id)
    });
  };

  connectBackTo = () => {
    this.setState({
      statusInventory: this.state.statusInventory.sort(
        (a, b) => b.active - a.active
      )
    });
  };
  nameBackTo() {
    this.setState({
      deviceInventory: this.state.deviceInventory.sort((a, b) => {
        const abc = this.state.camID && this.state.camConnect ? -1 : 1;
        return abc * a.name.localeCompare(b.name);
      })
    });
  }

  render() {
    const {
      deviceInventory,
      statusInventory,
      searchFilter,
      camConnect
    } = this.state;

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
          <div className="toggle">
            <div onClick={this.nameSwitch}>By Name</div>
            <div onClick={this.connectSwitch}>By Status</div>
            <div onClick={this.idSwitch}>By Id</div>
          </div>
          <div className="reverse">
            <button onClick={this.idBackTo}>Acending</button>
            <button onClick={this.nameBackTo}>A-Z</button>
            <button onClick={this.connectBackTo}>Active-Inactive</button>
            <button onClick={this.idReverse}>Decending</button>
            <button onClick={this.nameReverse}>Z-A</button>
            <button onClick={this.connectReverse}>Inactive-Active</button>
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
