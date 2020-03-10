const express = require("express");
const app = express();
const { viewAllDevices } = require("./controllers/deviceController");
const { viewAllStatus } = require("./controllers/statusController");
const port = 4001;

app.use(express.json());
app.use(express.static(`${__dirname}/../build`));
app.get("/api/all_devices/", viewAllDevices);

app.get("/api/all_status", viewAllStatus);

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`loud and clear on ${port}`);
});
