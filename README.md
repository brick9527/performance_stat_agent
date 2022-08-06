# performance_stat

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
├─config.json # 配置文件
└─index # 项目入口
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

- [x] 完成表格输出
- [ ] 完成CLI开发