const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 1234 });

wss.on("connection", (ws) => {
   console.log("Klien terhubung");

   ws.on("message", (message) => {
      console.log(`Menerima pesan: ${message}`);
      // Teruskan pesan ke semua klien yang terhubung
      wss.clients.forEach((client) => {
         if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
         }
      });
   });

   ws.on("close", () => {
      console.log("Klien terputus");
   });
});
