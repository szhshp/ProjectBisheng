# Project Bisheng - VSC Extension

> '毕昇'-Markdown 中英文混排工具的 VSC 插件


## Usage

以下两种方法皆可:

1. `Ctrl + Shit + P`, 选择 `BiSheng Formatter: Format Text`
2. `Ctrl + Alt + B`

即可格式化 **选中的文字** (或当前编辑的整个文件)

## Dev

```
npm i
```

然后使用 Debug 或按下 `F5`


## Publish

```
npm install -g vsce
vsce login {publisherName}
# Login with PAT(Personal Access Token)
vsce publish
```



## TODO

- [x] Readme
- [x] Git Ignore /dist
- [x] Core
  - [x] 繁体支持
  - [ ] 符号与英文之间添加空格 (可选)
- [x] NPM
- [ ] VSC Extension
  - [x] 发布到 VSC Market
  - [x] Ext Icon
  - [x] 快捷键
    - [ ] Format On Save
  - [ ] 配置选项
  - [x] Format Selected
- [ ] 网页端实现
