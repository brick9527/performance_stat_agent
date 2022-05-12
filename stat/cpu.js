const cpuStat = require('cpu-stat');
const dayjs = require('dayjs');

const appendFile = require('../libs/apend_file');

function _getSingleCoreStat(coreIndex, batchId, targetCPUStatFilePath) {
  return new Promise((resolve, reject) => {
    cpuStat.usagePercent(
      {
        coreIndex,
        sampleMs: 1000,
      },
      function (err, percent) {
        if (err) {
          return reject(err);
        }

        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const usedPercent = Number(percent.toFixed(2));
        const statData = {
          type: 'cpu',
          timestamp,
          batchId,
          coreIndex,
          usedPercent,
        };

        const statDataList = ['cpu', timestamp, batchId, coreIndex, usedPercent];
        appendFile(targetCPUStatFilePath, statDataList.join(', ') + '\n');

        resolve(statData);
      }
    );
  });
}

/**
 * CPU统计数据
 * | 时间 | CPU核数index | 使用率| 
 * @returns 
 */
module.exports = function (batchId, targetCPUStatFilePath) {
  const totalCores = cpuStat.totalCores();
  const getCPUStatFuncList = [];
  for (let coreIndex = 0; coreIndex < totalCores; coreIndex++) {
    getCPUStatFuncList.push(_getSingleCoreStat(coreIndex, batchId, targetCPUStatFilePath));
  }
  return getCPUStatFuncList;
};