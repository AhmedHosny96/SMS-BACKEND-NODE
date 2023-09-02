const app = require("express")();
const winston = require("winston");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

// const WebSocket = require("ws");

// app.use(
//   cors({
//     origin: "http://localhost:8000", // Allow requests from your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
//     credentials: true, // Allow cookies and authentication headers
//   })
// );

app.use(cors());

require("dotenv").config();
require("./config/db");
// require("./routes/subjects.route")(app);
require("./startup/routes")(app);
require("./startup/logging")();

const port = process.env.PORT;

// Specify the port for your Socket.IO server

app.listen(port, () => {
  winston.info(`listening on port ${port}`);
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  winston.info("A user connected");

  // Handle events from the client
  socket.on("message", (data) => {
    winston.info("Received message:", data);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    winston.info("User disconnected");
  });
});

// server.listen(socketPort, () => {
//   console.log(`Socket.IO server listening on port ${socketPort}`);
// });
