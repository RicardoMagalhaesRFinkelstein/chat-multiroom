//importar as configurações do servidor
var app = require('./config/server');

// parametrizar a porta de escuta
//encapsulando pois é necessário passar a instrução de listen pro socket.io
var server = app.listen(80, function(){
    console.log('Servidor online');
})

var io = require('socket.io').listen(server);

app.set('io',io)

//criar a conexão por websocket
io.on('connection',function (socket) {
    console.log('Usuário conectou');

    socket.on('disconnect',function (params) {
        console.log('Usuário desconectou');
    })

    socket.on('msgParaServidor', function (data) {
        //dialogo
        //esse bloco faz com que a mensagem apareça pro usuário que a enviou
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido , mensagem:data.mensagem}
        );
        
        //esse bloco faz com que a mensagem apareça para os outros usuários
        socket.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido , mensagem:data.mensagem}
        );

        // participantes
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0)
        {
            socket.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );
            
            //esse bloco faz com que a mensagem apareça para os outros usuários
            socket.broadcast.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );
        }
    })
})