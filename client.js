// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3000');

// Connection opened
socket.addEventListener('open', function (event) {
      console.log('Connected to websocket')
      // socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
      document.getElementById("randomValue").innerHTML = event.data;
});

const startPlay = () => {
      var count = 0
      setInterval(function () {
            count++
            socket.send(count);
      }, 10000);
}