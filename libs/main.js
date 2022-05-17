const checkArgv = require('./check_argv');
const getAllPerformance = require('./get_all_performance');
const sendUDP = require('./udp');

module.exports = async function(cli) {
  // 检查参数, 给默认值
  const argvs = await checkArgv(cli.flags);
  console.log(argvs);

  if (!argvs.interval) {
    // 任何参数都不传, 默认运行一次
    const result = await getAllPerformance();
    console.log(result);
    sendUDP(argvs, result);
    process.exit(0);
  }



};
