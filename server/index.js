const express = require("express");
const app = express();
const { viewAllDevices } = require("./controllers/deviceController");
const { viewAllStatus } = require("./controllers/statusController");
const port = 4001;

app.use(express.json());

app.get("/api/all_devices", viewAllDevices);

app.get("/api/all_status", viewAllStatus);

app.listen(port, () => {
  console.log(`loud and clear on ${port}`);
});
