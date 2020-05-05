const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes')
const { setupWebSocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb://omnistack:omnistack@cluster0-shard-00-00-j8cez.mongodb.net:27017,cluster0-shard-00-01-j8cez.mongodb.net:27017,cluster0-shard-00-02-j8cez.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(3333);

//get,post,put,delete

//query params = request.query (filtro, ordenação...) **GET
//route params = request.params (identificar registro) **PUT/DELETE
//body = request.body (dados pra criar ou alterar) **POST/PUT

