const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const socket = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser } = require('./routes/chatUsers');

const PORT = process.env.PORT || 5000;
const chatPORT = process.env.PORT || 2000;

//init express
const app = express();
app.use(cors());
//call the connect db function  
connectDB();
//initialise body parser
app.use(express.json({extended: false}));

const server = http.createServer(app);
const io = socket(server)


io.on('connection', (socket) => {
    socket.on('join',({name}, callback) => {
        console.log(name)

    socket.on('sendMessage', (message, callback) => {
        const user = name;

        io.emit('message', {name, text: message});
    })
        //do sth afte message is sent
        // callback();
    })



        
    socket.on('disconnect', () => {
        console.log('user has been disconnected');
    });


})

console.log('socket route')
server.listen(chatPORT, ()=> console.log(`chat serevr has started on port ${chatPORT}`));


app.get('/', (req, res) => {
    res.send('app is working');
})


//define routes

app.use('/api/signup', require('./routes/api/signup'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/chatRoute', require('./routes/api/chatRoute'));


app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${5000}`));


//mongodb+srv://root:password123456789@cluster0-mavvv.mongodb.net/test?retryWrites=true&w=majority
