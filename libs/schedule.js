const CronJob = require('cron').CronJob;

const getAllPerformance = require('./get_all_performance');

module.exports = function() {
  const stat = new CronJob('*/5 * * * * *', getAllPerformance);
  stat.start();
};
