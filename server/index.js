var db = require('./database.js');
db.sequelize.sync({force: true})

ws = require('./webSocket');
const port = 7000;
const host = "localhost";
const express = require('express'),
    app = express();
const cors = require('cors')

app.use(cors())
app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)
ws.wsServer.on('request', function(request) {
    const connectionInfo = ws.connectUser(request);
    connectionInfo.connection.on("message", function (message) {
      if (message.type === "utf8") {
        const dataFromClient = JSON.parse(message.utf8Data);
        console.log(dataFromClient);
        db.Phone.create({
          code: dataFromClient.code,
          number: dataFromClient.number,
        }).then(() => {
          ws.sendMessage(JSON.stringify(dataFromClient));
        });
      }
    });
    connectionInfo.connection.on('close', function() {
        ws.disconnectUser(connectionInfo.userID);
    });
});
app.get('/phones', (req, res) => {
    db.Phone.findAll({
        order: [["id", "DESC"]],
        attributes: ["id", "code", "number"]
    }).then((allPhones) => {
        res.send(allPhones);
    })
})





