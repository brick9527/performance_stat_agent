const CronJob = require('cron').CronJob;

const getAllPerformance = require('./get_all_performance');
const sendUDP = require('./udp');
const print = require('./print');
const appendFile = require('./apend_file');

function _getAllPerformanceAndSend(argvs) {
  return async function () {
    const result = await getAllPerformance();
    print(argvs, result);
    appendFile(argvs, result);
    sendUDP(argvs, result);
  };
}

module.exports = function(argvs) {
  const stat = new CronJob(
    `* */${argvs.interval} * * *`,
    _getAllPerformanceAndSend(argvs),
    null,
    null,
    null,
    null,
    _getAllPerformanceAndSend(argvs),
  );
  stat.start();
};
