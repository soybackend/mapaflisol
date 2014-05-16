//módulos de node
var express = require('express');
var http = require('http');

//se  crea app, server y sockets
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = 3000;


app.set('views', __dirname + '/views'); //vistas
app.set('view engine', 'jade'); //sistema de plantillas
app.use(express.static(__dirname + '/public')); //staticos

//ruta / que vamos a manejar
app.get('/', function(req, res) {
    res.render('index', {
        'title': 'Mapa para la flisol'        
    });
});

//sockets :3
io.sockets.on('connection', function(socket) {
    
    // Escuchamos datos
    socket.on('send:coords', function (data) {

	        // Enviamos usuario a front
	        socket.broadcast.emit('load:coords', {coords:data.coords});
    
    });
});


//Iniciamos servidor
server.listen(port);
console.log('Servidor funcionando en http://localhost:' + port);