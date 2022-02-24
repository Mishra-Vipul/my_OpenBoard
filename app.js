const express = require("express"); //access
const socket = require("socket.io"); //access

const app = express(); //Initialise and server ready

app.use(express.static("public"));

let port = 3000;
let server =app.listen(port , () => {
    console.log("Listening to port " + port);
})

let io =  socket(server);

io.on("connection", (socket) => {
    console.log("made socket connection");

    //recieved
    socket.on("beginPath" , (data) => {
        // data -> data from frontend

        // Transfer data to all computers
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke",(data) => {
        io.sockets.emit("drawStroke",data);
    })

    socket.on("redoUndo",(data) => {
        io.sockets.emit("redoUndo", data);
    })
})