const checkArgv = require('./check_argv');
const getAllPerformance = require('./get_all_performance');
const sendUDP = require('./udp');
const schedule = require('./schedule');
const print = require('./print');
const appendFile = require('./apend_file');

module.exports = async function(cli) {
  // 检查参数, 给默认值
  const argvs = await checkArgv(cli.flags);
  
  process.env.argvs = argvs;
  
  if (!argvs.interval) {
    // 任何参数都不传, 默认运行一次
    const result = await getAllPerformance();
    print(argvs, result);
    appendFile(argvs, result);
    sendUDP(argvs, result);
    process.exit(0);
  }

  schedule(argvs);
};
