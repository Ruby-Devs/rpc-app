const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:6040');

// Wait for the WebSocket connection to be open
ws.on('open', () => {
  const message = {
    applicationId: '1160723200943071232',
    rpcData: {
      state: 'Playing it',
      details: 'In Menu',
      assets: {
        large_image: "nye",
        large_text: "Nyenye",
      },
      buttons: [
        {
            label: "Visit RubyTeam",
            url: "https://rubyteam.tech/"
        }
    ],
    },
  };

  // Now that the connection is open, you can send the message
  ws.send(JSON.stringify(message));
});

// Handle errors
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

// Handle close event
ws.on('close', (code, reason) => {
  console.log(`WebSocket closed: ${code} - ${reason}`);
});