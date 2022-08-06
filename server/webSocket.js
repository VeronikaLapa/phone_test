const webSocketsServerPort = process.env.WS_PORT;

const webSocketServer = require("websocket").server;
const http = require("http");
const utils = require("./utils");

const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});

const clients = {};

const sendMessage = (json) => {
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
};

const connectUser = (request) => {
  const userID = utils.getUniqueID();
  console.log(
    new Date() +
      " Received a new connection from origin " +
      request.origin +
      "."
  );
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(
    "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );
  return { connection, userID };
};
const disconnectUser = (userID) => {
  console.log(new Date() + " Peer " + userID + " disconnected.");
  delete clients[userID];
  console.log("Connected users: " + Object.getOwnPropertyNames(clients));
};

module.exports = {
  wsServer: wsServer,
  sendMessage,
  connectUser,
  disconnectUser,
};
