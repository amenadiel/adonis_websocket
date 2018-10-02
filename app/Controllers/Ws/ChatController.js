const Ws = use('Ws')
const fs = require('fs');
const path=require('path');
'use strict'

class ChatController {
  constructor (ctx) {
    this.socket = ctx.socket;
    this.request = ctx.request;
    
    
  }

  onHello(algo) {
     let clientes = require(path.resolve(`${__dirname}/../../../cliente.json`));
      console.log({clientes});
      console.log('Se conectó el cliente ',this.socket.id);
      clientes[algo.username]=this.socket.id;
      fs.writeFileSync('cliente.json',JSON.stringify(clientes,null,4));
    console.log({algo});
  }

  onMessage (message) {
    console.log(message);
    this.socket.emit('message', message)

    const restaurant = Ws.getChannel('restaurant:*');
    
    let topic = restaurant.topic('restaurant:ordenes');
    topic.broadcast('message',message);
  }
}

module.exports = ChatController
