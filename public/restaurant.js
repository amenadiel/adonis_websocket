let ws = null;

$(function() {
    startChat();
});

function subscribeToChannel() {
  const chat = ws.subscribe("restaurant:ordenes");

  chat.on("error", () => {
    $(".connection-status").removeClass("connected");
  });

  chat.on("message", message => {
    $(".messages").append(`
      <div class="message"> El cliente <b> ${message.username} </b> ha pedido <b>${message.pedido}</b> </div>
    `);
  });
}

function startChat() {
  ws = adonis.Ws().connect();

  ws.on("open", () => {
    $(".connection-status").addClass("connected");
    subscribeToChannel();
  });

  ws.on("error", () => {
    $(".connection-status").removeClass("connected");
  });
}
