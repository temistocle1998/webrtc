// Requiring dependencies
var fs = require('fs');
const socketIO = require('socket.io');
var http = require('http');
var https = require('https');
var path = require("path");
const express = require("express");
const app = express();
const { ExpressPeerServer } = require("peer");
const shortid = require("shortid");

var privateKey = fs.readFileSync('cert-key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate };

//const server = require('http').Server(app)
const server = https.createServer(credentials, app);

const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});

app.use("/peerjs", ExpressPeerServer(server));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    setTimeout(() => {
      socket.to(roomId).emit("user-connected", userId);
    }, 1000)
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });

    // Gestionnaire de l'événement 'raise-hand'
    socket.on("raise-hand", (user) => {
      console.log(`${user} has raised their hand`);
      io.to(roomId).emit("user-raised-hand", user);
    });
  });
});

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
