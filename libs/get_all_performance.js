const { nanoid } = require('nanoid');

const getCPUPerformanceFunc = require('../stat/cpu');
const getMemPerformanceFunc = require('../stat/mem');
const getProcessPerformanceFunc = require('../stat/process');

/**
 * 采集/汇总所有性能信息
 * @returns {Promise<Function>}
 */
module.exports = async function () {
  const batchId = nanoid();
  // CPU
  const cpuStatFuncList = getCPUPerformanceFunc(batchId);

  // mem
  const memStatFuncList = getMemPerformanceFunc(batchId);

  // process
  const processStatFuncList = getProcessPerformanceFunc(batchId);

  const [memInfo, processInfo, ...cpuInfo] = await Promise.all([
    memStatFuncList,
    processStatFuncList,
    ...cpuStatFuncList,
  ]);

  return { mem: memInfo, process: processInfo, cpu: cpuInfo };
};