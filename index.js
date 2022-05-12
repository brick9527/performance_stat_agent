const path = require('path');
const dayjs = require('dayjs');
const CronJob = require('cron').CronJob;
const { nanoid } = require('nanoid');

const config = require('./config.json');
const mkdirSync = require('./libs/mkdir');
const getCPUPerformanceFunc = require('./stat/cpu');
const getMemPerformanceFunc = require('./stat/mem');
const getProcessPerformanceFunc = require('./stat/process');
const udpSend = require('./libs/udp');

/**
 * CPU统计数据
 * | 时间 | CPU核数index | 使用率| 
 * 
 * 内存统计数据
 * | 时间 | free | total | 空闲比 | 使用比 |
 */
async function performanceStat() {
  const targetFolderPath = mkdirSync(path.join(__dirname, 'stat_log'));

  const targetCPUStatFilePath = path.join(targetFolderPath, `cpu_stat_${dayjs().format('YYYY-MM-DD')}.txt`);
  const targetMemStatFilePath = path.join(targetFolderPath, `mem_stat_${dayjs().format('YYYY-MM-DD')}.txt`);
  const targetProcessStatFilePath = path.join(targetFolderPath, `process_stat_${dayjs().format('YYYY-MM-DD')}.txt`);

  const batchId = nanoid();
  // CPU
  const cpuStatFuncList = getCPUPerformanceFunc(batchId, targetCPUStatFilePath);

  // mem
  const memStatFuncList = getMemPerformanceFunc(batchId, targetMemStatFilePath);

  // process
  const processStatFuncList = getProcessPerformanceFunc(batchId, targetProcessStatFilePath);

  const result = await Promise.all([
    ...cpuStatFuncList,
    memStatFuncList,
    processStatFuncList,
  ]);

  udpSend(JSON.stringify(result));

  console.log('result = ', result);
}

performanceStat();

// const stat = new CronJob(config.interval, performanceStat);
// stat.start();
