# performance_stat

[toc]

## 安装(Install)

```bash
npm i -g performance-stat-agent
```

## 使用(Usage)

### 基本用法(Basic Usage)

可以使用`performance-stat-agent`命令, 也可以使用`psa`命令. 以下示例将会使用简写`psa`调用命令

```bash
psa
```

默认获取当前的系统性能信息输出在控制台.

### 参数(Options)

#### output

参数别名: `o`

将获取的性能信息输出到执行文件路径. 一共会生成3个文件:

- cpu: cpu信息
- mem: 内存信息
- process: 进程信息

```bash
psa -o ./agent-folder

# 或者
psa --output ./agent-folder
```

#### noTrace

参数别名: `t`

是否打印采集信息到控制台. 命令默认会将采集信息打印到控制台; 如果您设置了`output`参数, 可以考虑不将采集信息打印到控制台, 使用该参数即可.

```bash
# 不打印采集信息到控制台
psa -t

# 或
psa --noTrace
```

#### format

参数别名: `F`

格式化控制台输出信息格式, 默认为`json`.

可选值:

- `json`: 以json格式打印信息
- `table`: 以表格形式打印信息

```bash
psa -F table

#或
psa --format table
```

#### interval

参数别名: `i`

定时采集信息时间间隔(单位: 分钟).

```bash
# 每5分钟采集一次性能信息
psa -i 5

# 或
psa --interval 5
```

#### fileType

参数别名: `f`

当指定了`output`参数后, 可以继而指定输出文件的类型.

**注: 该命令只会修改文件的后缀名, 并不会对文件编码等方式进行修改**

```bash
psa -f txt

# 或
psa --fileType txt
```

#### help

参数别名: `h`

获取命令帮助页面.

```bash
psa -h

# 或
psa --help
```

#### version

参数别名: `v`

获取命令版本.

```bash
psa -v

# 或
psa --version
```

## 开发环境(Environment)

- Node: 14.19.1
- Linux: Ubuntu 18.04.6 LTS

## 目录结构(Structure)

```
├─.vscode # vscode配置文件
├─.husky # husky配置文件
├─libs # 公共函数
├─stat # 性能检测函数
|  ├─cpu.js # cpu检测
|  ├─mem.js # 内存检测
|  └─process.js # 进程检测
├─.env # 进程变量文件
└─config.json # 配置文件
```

## 代码提交规范(Commit Message Standard)

提交commit时遵循以下规范:

- feat：提交新功能
- fix：修复了bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复bug也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
- revert: 回滚

## 待做事项

- 0.1.x
  - [x] 完成表格输出
  - [x] 完成CLI开发
  - [x] 完善文档
- 0.2.x
  - [ ] 考虑是否需要传输功能
  - [ ] 添加测试用例
  - [ ] 添加英文文档
  - [ ] 添加man文档
