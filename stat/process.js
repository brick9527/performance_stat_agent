const psList = require('ps-list');
const dayjs = require('dayjs');

const appendFile = require('../libs/apend_file');

module.exports = async function (batchId, targetProcessStatFilePath) {
  const procssList = await psList();

  const shortProcessList = procssList
    .sort((first, second) => {
      return second.cpu - first.cpu;
    })
    .slice(0, 20);

  const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const processStatData = {
    type: 'process',
    timestamp,
    batchId,
    list: shortProcessList,
  };

  const processStatDataList = shortProcessList.map(processItem => {
    return [
      'process',
      timestamp,
      batchId,
      processItem.pid,
      processItem.ppid,
      processItem.uid,
      processItem.cpu,
      processItem.memory,
      processItem.name,
      encodeURIComponent(processItem.cmd),
    ].join(', ');
  });

  appendFile(targetProcessStatFilePath, processStatDataList.join('\n') + '\n');

  return processStatData;
};
