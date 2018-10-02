const Ws = use('Ws')

'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log(this.socket.topic);
  }

  onMessage (message) {
    this.socket.broadcastToAll('message', message)

    const restaurant = Ws.getChannel('restaurant:*');
    
    let topic = restaurant.topic('restaurant:ordenes');
    topic.broadcast('message',message);
  }
}

module.exports = ChatController
