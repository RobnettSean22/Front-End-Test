const devices = require("./sample-devices.json");
module.exports = {
  viewAllDevices: (req, res, next) => {
    res.status(200).send(devices);
  }
};
