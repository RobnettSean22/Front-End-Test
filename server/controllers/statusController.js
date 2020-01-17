const status = require("./sample-status.json");
module.exports = {
  viewAllStatus: (req, res, next) => {
    res.status(200).send(status);
  }
};
