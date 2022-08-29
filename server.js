const express= require('express')
const app = express()
const http = require('http').createServer(app)
const path=require('path');

const PORT=process.env.PORT || 3000
app.use('/',express.static(path.join(__dirname,'Public')));

http.listen(PORT , ()=>{
    console.log(`server listening on ${PORT}`)
})



app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

const io= require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log('connected')
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message',msg)
    })
})