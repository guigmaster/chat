/*importar as configurações do servidor */
var app = require('./config/server');

/*parametrizar a porta de escuta*/
var server = app.listen(3000, function(){
  console.log('Servidor online');
})
require('socket.io').listen(server);

var io = require('socket.io').listen(server);

app.set('io',io);

/*criar a conexão por websocket*/

io.on('connection',function(socket){

  console.log('user conected');
  socket.on('disconnect',function(){
    console.log('user disconected');
  });

  socket.on('msgParaServidor',function(data){
    /*diálogo*/
    socket.emit('msgParaCliente',
    {apelido:data.apelido,mensagem:data.mensagem}
    );

    socket.broadcast.emit('msgParaCliente',
    {apelido:data.apelido,mensagem:data.mensagem}
    );

    /*participantes*/
    if(parseInt(data.apelido_atualizado_nos_clientes)==0){
      socket.emit('participantesParaCliente',
      {apelido:data.apelido}
      );

      socket.broadcast.emit('participantesParaCliente',
      {apelido:data.apelido}
      );
    }
  });

});
