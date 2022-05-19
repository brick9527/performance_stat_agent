const CronJob = require('cron').CronJob;

const getAllPerformance = require('./get_all_performance');
const sendUDP = require('./udp');


function _getAllPerformanceAndSend(argvs) {
  return async function () {
    const result = await getAllPerformance();
    sendUDP(argvs, result);
  };
}

module.exports = function(argvs) {
  const stat = new CronJob(`*/${argvs.interval} * * * * *`, _getAllPerformanceAndSend(argvs));
  stat.start();
};
