const dgram = require('dgram');
const { Buffer } = require('buffer');

const client = dgram.createSocket('udp4');

/**
 * 发送udp数据报
 * @param {*} argv
 * @param {Object} data 
 * @returns 
 */
module.exports = function(argv, data) {
  if (argv.protocol !== 'udp') {
    return;
  }
  
  const dataStr = JSON.stringify(data);
  const message = Buffer.from(dataStr);
  client.send(message, argv.port, argv.host, (err) => {
    console.log(err);
  });
};
