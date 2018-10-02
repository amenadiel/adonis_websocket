let ws = null;

$(function() {
  if (window.username) {
    startChat();
  }
   $("#message").keyup(function(e) {
    if (e.which === 13) {
      e.preventDefault();

      const message = $(this).val();
      $(this).val("");

      ws.getSubscription("restaurant:pedir").emit("message", {
        username: window.username,
        pedido: message
      });
      return;
    }
  });
});

function subscribeToChannel() {
  const chat = ws.subscribe("restaurant:pedir");

  chat.on("error", () => {
    $(".connection-status").removeClass("connected");
  });

  chat.on("message", message => {
    $(".messages").append(`
      <div class="message">Se envió su pedido <b>${message.pedido}</b> a nombre de <b> ${message.username} </b> </div>
    `);
  });

  ws.getSubscription("restaurant:pedir").emit("hello", {
        username: window.username
      });
}

function startChat() {
  ws = adonis.Ws().connect({reconnection:false});

  ws.on("open", () => {
    $(".connection-status").addClass("connected");
    subscribeToChannel();
  });

  ws.on("error", () => {
    $(".connection-status").removeClass("connected");
  });
}
