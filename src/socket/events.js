module.exports = function registerSocketEvents(socket) {
    socket.on("join_branch", (branchId) => {
        const roomName = `branch_${branchId}`;
        socket.join(roomName);
        console.log(`Client ${socket.id} joined branch room: ${roomName}`);
    });

    socket.on("join_counter", (counterId) => {
        const roomName = `counter_${counterId}`;
        socket.join(roomName);
        console.log(`Client ${socket.id} joined counter room: ${roomName}`);
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
};
