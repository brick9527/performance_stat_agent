const psList = require('ps-list');
const dayjs = require('dayjs');

module.exports = async function (batchId) {
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

  return processStatData;
};
