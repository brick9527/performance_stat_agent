const Table = require('cli-table');

module.exports = function(argvs, ...parameter) {
  if (argvs.noTrace) {
    return;
  }

  if (argvs.format.toLowerCase() === 'json') {
    console.log(JSON.stringify(parameter));
    return;
  }

  if (argvs.format.toLowerCase() === 'table') {
    for (const dataItem of parameter) {
      // #region mem table
      const memTable = new Table({
        head: ['timestamp', 'total', 'free', 'freePercent', 'usedPercent'],
      });

      const memData = dataItem.mem || {};
      memTable.push([memData.timestamp, `${memData.total} ${memData.unit}`, `${memData.free} ${memData.unit}`, `${memData.freePercent}%`, `${memData.usedPercent}%`]);
      console.log(memTable.toString());
      // #endregion

      // #region cpu table
      const cpuTable = new Table({
        head: ['timestamp', 'coreIndex', 'usedPercent'],
      });
      const cpuData = dataItem.cpu || [];
      const cpuTableDataList = cpuData.map(cpuDataItem => {
        return [cpuDataItem.timestamp, cpuDataItem.coreIndex, `${cpuDataItem.usedPercent}%`];
      });
      cpuTable.push(...cpuTableDataList);
      console.log(cpuTable.toString());
      // #endregion

      // #region process table
      const processTable = new Table({
        head: ['#', 'timestamp', 'pid', 'ppid', 'uid', 'cpu', 'memory', 'name', 'cmd'],
      });
      const processData = dataItem.process || {};
      const timestamp = processData.timestamp;
      const processDataList = processData.list || [];

      const processTableDataList = processDataList.map((processDataItem, index) => {
        return [
          index + 1,
          timestamp,
          processDataItem.pid,
          processDataItem.ppid,
          processDataItem.uid,
          `${processDataItem.cpu}%`,
          `${processDataItem.memory}%`,
          processDataItem.name,
          processDataItem.cmd];
      });
      processTable.push(...processTableDataList);
      console.log(processTable.toString());
      // #endregion
    }
  }
};