import express from "express"
import http from "http"
import cors from "cors";

const app=express();
app.use(cors());
const server =http.createServer(app);

import { Server } from "socket.io";
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});

app.get("/",(req,res)=>{
    res.send("hi there");
})

io.on("connection",(socket)=>{
    // socket is a user connected to the server
    console.log("a user connected, ",socket.id)
    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })//when a user disconnects

    socket.on("chat mssg",(mssg)=>{//when a user send a mssg 
        console.log("message send is ",mssg)

        io.emit("chat mssg",mssg)//broadcast the mssg to every user of io,io refers to every socket
    })

})

server.listen(3000,()=>{
    console.log("server is listening at the port 3000")
});