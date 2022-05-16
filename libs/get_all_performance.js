const { nanoid } = require('nanoid');

const getCPUPerformanceFunc = require('../stat/cpu');
const getMemPerformanceFunc = require('../stat/mem');
const getProcessPerformanceFunc = require('../stat/process');

/**
 * 
 * @returns {Promise<Function>}
 */
module.exports = function () {
  const batchId = nanoid();
  // CPU
  const cpuStatFuncList = getCPUPerformanceFunc(batchId);

  // mem
  const memStatFuncList = getMemPerformanceFunc(batchId);

  // process
  const processStatFuncList = getProcessPerformanceFunc(batchId);

  return Promise.all([
    ...cpuStatFuncList,
    memStatFuncList,
    processStatFuncList,
  ]);
};