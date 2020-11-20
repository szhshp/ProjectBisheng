# Project Bisheng (Under Development)

> '毕昇' - 中英文混排工具, 此工具仅适用于中文, 将不会支持多语言

## NPM

```
npm install bisheng-formatter-core -S
```

```js
const { bishengFormat } = require("bisheng-formatter-core");
console.log(bishengFormat("测试文本abc"));
```

## TODO

- [x] Config
  - [x] Git Ignore /dist
- [x] Core
  - [x] 发布到 NPM
  - [ ] 繁体支持
- [ ] VSC Ext
  - [x] 使用最新版的 Core
  - [ ] 添加快捷键
  - [ ] 配置选项
  - [ ] 仅格式化选中的文本
  - [ ] 发布到 Market
- [ ] ES5 Release
- [ ] 网页端实现
