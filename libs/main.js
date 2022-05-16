const checkArgv = require('./check_argv');
const getAllPerformance = require('./get_all_performance');

module.exports = async function(cli) {
  // 检查参数, 给默认值
  const argvs = await checkArgv(cli.flags);
  console.log(argvs);

  // 任何参数都不传, 默认运行一次
  const result = await getAllPerformance();
  console.log(result);
};
