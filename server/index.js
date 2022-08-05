require('dotenv').config();

var db = require("./database.js");
db.sequelize.sync({ force: true });

ws = require("./webSocket");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express().use(cors()).use(bodyParser.json());

const port = parseInt(process.env.WS_PORT);
const host = process.env.WS_HOST;
app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);

ws.wsServer.on("request", function (request) {
  const connectionInfo = ws.connectUser(request);
  connectionInfo.connection.on("message", function (message) {
    if (message.type === "utf8") {
      const dataFromClient = JSON.parse(message.utf8Data);
      console.log(dataFromClient);
    }
  });
  connectionInfo.connection.on("close", function () {
    ws.disconnectUser(connectionInfo.userID);
  });
  connectionInfo.connection.on("error", function (err) {
    console.log("Error for user" + connectionInfo.userID);
  });
});
app.get("/phones", (req, res) => {
  db.Phone.findAll({
    order: [["id", "DESC"]],
    attributes: ["id", "code", "number"],
  })
    .then((allPhones) => {
      res.send(allPhones);
    })
    .catch((err) => {
      res.error();
    });
});
app.post("/phones", (req, res) => {
  const code = req.body.code;
  const number = req.body.number;
  db.Phone.create({
    code: code,
    number: number,
  }).then((user) => {
      ws.sendMessage(JSON.stringify({code: user.code, number: user.number, id: user.id}));
      res.send(user);
    })
    .catch((err) => {
      res.error();
    });
});
