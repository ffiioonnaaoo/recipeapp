const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const socketio = require('socket.io');
const connectDB = require('./config/db');

//call the connect db function
connectDB();
const PORT = process.env.PORT || 2000;

const http = require('http');


//sockets dependencies

const server = http.createServer(app);
const io = socketio(server);







//initialise body parser
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    res.send('app is working');
})


//define routes




server.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${2000}`));


//mongodb+srv://root:password123456789@cluster0-mavvv.mongodb.net/test?retryWrites=true&w=majority
