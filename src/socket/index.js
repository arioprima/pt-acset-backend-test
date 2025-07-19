const { Server } = require("socket.io");
const registerSocketEvents = require("./events");
let io = null;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);
        registerSocketEvents(socket);
    });
}

function getIO() {
    if (!io) throw new Error("Socket.IO not initialized");
    return io;
}

module.exports = { initSocket, getIO };
