const dgram = require('dgram');
const { Buffer } = require('buffer');

const client = dgram.createSocket('udp4');

module.exports = function(dataStr) {
  const message = Buffer.from(dataStr);
  client.send(message, 41234, '127.0.0.1', (err) => {
    console.log(err);
  });
}