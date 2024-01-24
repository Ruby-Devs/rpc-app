// Code made by MubiLop from Ruby Team
const WebSocket = require('ws');

console.log("Ruby Devs Technology | Made by MubiLop")

function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: 6040 });
  console.log("RPC: Server Started")

  wss.on('connection', (ws) => {
    console.log("RPC: Client Connected")
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        if (data.applicationId && data.rpcData) {
          updateDiscordRPC(data.applicationId, data.rpcData);
          const JSONString = JSON.stringify(data.rpcData)
          console.log(`RPC: ${JSONString}`)
        } else {
          console.error('Invalid WebSocket message format');
        }
      } catch (error) {
        console.error('Invalid JSON format');
      }
    });
  });

  wss.on('close', () => {
    console.log('WebSocket server closed. Restarting...');
    startWebSocketServer();
  });

  function updateDiscordRPC(applicationId, rpcData) {
    if (rpcData.state || rpcData.details) {
        (new (require("easy-presence").EasyPresence)(applicationId)).setActivity({
            details: rpcData.details || undefined,
            state: rpcData.state || undefined,
            assets: rpcData.assets || undefined,
            buttons: rpcData.buttons || undefined,
            party: rpcData.party || undefined,
            timestamps: { start: new Date() }
        });
    }
  }

  wss.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
}

startWebSocketServer();
