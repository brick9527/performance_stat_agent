#!/usr/bin/env node
require('dotenv').config();
const meow = require('meow');
const chalk = require('chalk');

const main = require('../libs/main');

const cli = meow(`
  ${chalk.bgBlue('# 用法(Usage)')}
    ${chalk.green('$')} performance-stat-agent <options>
  
  ${chalk.bgBlue('# 选项(Options) ')}
    --interval, -i                  性能检测时间间隔(单位: 分钟). 例如: 5
    --host, -H                      接收数据服务器host. 例如: 127.0.0.1
    --port, -p                      接收数据服务器端口
    --protocol, -P                  数据传输使用协议. 可选: udp. 默认: udp
    --output, -o                    本地文件存储路径.
    --fileType, -f                  本地文件存储格式. 默认: txt
    --noTrace, -t                   不实时打印采集数据. 默认: false
    --format, -F                    打印格式. 可选: json, table. 默认: json
    --help, -h                      帮助
    --version, -v                   查看版本号

  ${chalk.bgBlue('# 示例(Example) ')}
    1. 查看帮助
    ${chalk.green('$')} performance-stat-agent -h

    2. 查看版本号
    ${chalk.green('$')} performance-stat-agent -v

    3. 定时每10分钟检测一次性能, 并发送给本机的udp服务器
    ${chalk.green('$')} performance-stat-agent -i 10 --protocol udp -H 127.0.0.1 -p 53 -o /var/data/log -f log

  ${chalk.bgBlue('# 反馈(Feedback) ')}
    请以issue的形式进行反馈:
    https://github.com/brick9527/performance_stat_agent/issues
`, {
  flags: {
    help: {
      type: 'boolean',
      alias: 'h',
    },
    version: {
      type: 'boolean',
      alias: 'v',
    },
    interval: {
      type: 'number',
      alias: 'i',
    },
    protocol: {
      type: 'string',
    },
    host: {
      type: 'string',
      alias: 'H',
    },
    port: {
      type: 'number',
      alias: 'P',
    },
    output: {
      type: 'string',
      alias: 'o',
    },
    fileType: {
      type: 'string',
      alias: 'f',
    },
    noTrace: {
      type: 'boolean',
      alias: 't',
    },
    format: {
      type: 'string',
      alias: 'F',
    },
  },
});

main(cli);
