# Project Bisheng - VSC Extension

> '毕昇'-Markdown 中英文混排工具的 VSC 插件

- [Project Bisheng - VSC Extension](#project-bisheng---vsc-extension)
  - [Usage](#usage)
  - [Config](#config)
  - [Contribute](#contribute)
    - [Dev](#dev)
    - [Publish](#publish)

## Usage

以下两种方法皆可:

1. `Ctrl + Shit + P`, 选择 `BiSheng Formatter: Format Text`
2. `Ctrl + Alt + B`

即可格式化 **选中的文字** (或当前编辑的整个文件)

## Config

`Ctrl + Shit + P`, 选择 `Open User Settings` 搜索 `BiSheng Formatter` 以进行配置

## Contribute

### Dev

```
npm i
```

然后使用 Debug 或按下 `F5`


### Publish

```
npm install -g vsce

vsce login {publisherName}
# Login with PAT(Personal Access Token)
# @See: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
# @Login: https://dev.azure.com/

vsce publish
# vsce publish major  = 1.0.0->2.0.0
# vsce publish minor  = 1.0.0->1.1.0
# vsce publish patch  = 1.0.0->1.0.1
```
