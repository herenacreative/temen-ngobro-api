const express = require('express')
const app = express()
const port = 1250
require('dotenv').config()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { Socket } = require('socket.io-client');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routers = require('./src/routes/index')
const connection = require('./src/helpers/mysql')
connection.connect(function(error) {
    if (error) throw error;
    console.log("Database Has Connected !")
})
app.use('/uploads',express.static('./uploads'));
app.use(bodyParser.urlencoded({
    extended: true
}))
io.on('connection', (socket) => {
  console.log('a user connection')
  socket.on('chat-message', msg =>{
    console.log(msg)
  });
  socket.on('disconnect' , ()=>{
    console.log('a user disconnection')
  })
});
app.use(bodyParser.json());
app.use(cors())
app.use(morgan('dev'));
app.use((req, res, next) => {
  req.io = io;
  next();
})

app.use('/v1', routers)

server.listen(port, () => {
    console.log('listening to the port : ' + port)
})