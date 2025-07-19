module.exports = function registerSocketEvents(socket) {
    socket.on("join_branch", (branchId) => {
        console.log(`Client ${socket.id} joined branch ${branchId}`);
        socket.join(branchId);
    });

    socket.on("leave_branch", (branchId) => {
        console.log(`Client ${socket.id} left branch ${branchId}`);
        socket.leave(branchId);
    });
};
