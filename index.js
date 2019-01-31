const app = require('http').createServer();
const io = require("socket.io")(app);

app.listen(8080);

io.on('connect', onConnect);

function onConnect(socket) {
    logMessage(socket, 'New user connected');
    onJoinRoom(socket);
    handleDirectMessage(socket);
    onDisconnect(socket)
}

function onJoinRoom(socket) {
    socket.on('JOIN_ROOM', (data) => {
        socket.join(data);
        logMessage(socket, 'Joined room [' + data + ']');
        socket.to(data).emit('NEW_USER', socket.id);
    })
}

//data message should contain: from, to, content
function handleDirectMessage(socket) {
    socket.on('DIRECT_MESSAGE', (data) => {
        const jsonData = JSON.parse(data);
        logMessage(socket, 'Direct message sent to [' + jsonData.to + '] of type: ['+jsonData.type+']');
        socket.to(jsonData.to).emit('DIRECT_MESSAGE', data)
    });
}

function onDisconnect(socket) {
    socket.on('disconnect', () => {
        logMessage(socket, 'Disconnected')
    })
}

function logMessage(socket, message) {
    console.log('[' + socket.id + '] ' + message)
}