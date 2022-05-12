const memStat = require('mem-stat');
const dayjs = require('dayjs');

const appendFile = require('../libs/apend_file');

/**
 * 内存统计数据
 * | 时间 | free | total | 空闲比 | 使用比 |
 * @returns 
 */
module.exports = function(batchId, targetMemStatFilePath) {
  return new Promise(resolve => {
    const UNIT = 'KiB';
    const memStatResult = memStat.allStats(UNIT);

    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const total = Number(memStatResult.total.toFixed(2));
    const free = Number(memStatResult.free.toFixed(2));
    const freePercent = Number(memStatResult.freePercent.toFixed(2));
    const usedPercent = Number(memStatResult.usedPercent.toFixed(2));
    const memStatData = {
      type: 'mem',
      timestamp,
      batchId,
      total,
      free,
      unit: UNIT,
      freePercent,
      usedPercent,
    };

    const memStatDataList = ['mem', timestamp, batchId, total, free, UNIT, freePercent, usedPercent];

    appendFile(targetMemStatFilePath, memStatDataList.join(', ') + '\n');

    return resolve(memStatData);
  });
};