const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

const mkdir = require('./mkdir');

function _generateFilePath(targetFolder, type, fileType) {
  const timestamp = dayjs().format('YYYYMMDD');
  return path.join(targetFolder, `${type}_${timestamp}.${fileType}`);
}

function _appendFile(targetFile, dataStr) {
  fs.writeFileSync(targetFile, dataStr, { encoding: 'utf-8', flag: 'a+' });
}

module.exports = function(argv, data) {
  if (!argv.output || !argv.fileType) {
    return;
  }

  let targetFolder;
  if (argv.output.startsWith('/')) {
    targetFolder = mkdir(argv.output);
  } else {
    targetFolder = mkdir(path.join(process.cwd(), argv.output));
  }

  const { cpu, mem, process: processInfo } = data;

  const cpuFilePath = _generateFilePath(targetFolder, 'cpu', argv.fileType);
  const memFilePath = _generateFilePath(targetFolder, 'mem', argv.fileType);
  const processFilePath = _generateFilePath(targetFolder, 'process', argv.fileType);

  
  // 写入cpu数据
  _appendFile(cpuFilePath, cpu.map(JSON.stringify).join('\n') + '\n');
  
  // 写入mem数据
  _appendFile(memFilePath, JSON.stringify(mem) + '\n');

  // 写入process数据
  _appendFile(processFilePath, JSON.stringify(processInfo) + '\n');
};
