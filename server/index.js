var db = require('./database.js');
db.sequelize.sync({force: true})

ws = require('./webSocket');
const port = 7000;
const host = "localhost";
const express = require('express'),
    app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
)
ws.wsServer.on('request', function(request) {
    const connectionInfo = ws.connectUser(request);
    connectionInfo.connection.on("message", function (message) {
      if (message.type === "utf8") {
        const dataFromClient = JSON.parse(message.utf8Data);
        console.log(dataFromClient);
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
app.post('/phones', (req, res) => {
    console.log(req);
    const code = req.body.code;
    const number = req.body.number;
    db.Phone.create({
        code: code,
        number: number,
    }).then((user) => {
        ws.sendMessage(JSON.stringify({code, number}));
        res.send(user);
    }).catch((err) => {
        res.error();
    });

})





