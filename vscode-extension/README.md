


# TLDR: Usage

![](https://github.com/szhielelp/ProjectBisheng/blob/05576265a11bc0c5a6dc8af46ce2f741e1ed1577/vscode-extension/assets/demo.gif)

以下两种方法皆可:

1. `Ctrl + Shit + P`, 选择 `BiSheng Formatter: Format Text`
2. `Ctrl + Alt + B`

即可格式化 **选中的文字** (或当前编辑的整个文件)


---------------------

# Project Bisheng - VSC Extension

## Config

`Ctrl + Shit + P`, 选择 `Open User Settings` 搜索 `BiSheng Formatter` 以进行配置

## Contribute

### Dev

```
yarn
yarn webpack
```

然后使用 Debug 或按下 `F5`


### Publish

> @See: https://code.visualstudio.com/api/working-with-extensions/publishing-extension

1. `yarn add vsce -g` 
2. 登陆 Azure: https://aex.dev.azure.com/me, 选择 '3rd' Organization
   1. 这个 Organization 里面没有 repo 不用在意
3. 生成 PAT, 切记要选择 'all accessible'
4. `vsce login szhshp`
5. 切记进入到 vscode-extension 这个目录 
6. 发布小版本更新: `vsce publish patch`

```
vsce publish patch
# vsce publish major  = 1.0.0->2.0.0
# vsce publish minor  = 1.0.0->1.1.0
# vsce publish patch  = 1.0.0->1.0.1
```

#### Troubleshooting

##### Access Denied

```
Error: Access Denied: xxxx-xxxx-xxxx-xxxx-xxxxxxxx needs the following permission(s) on the resource /szhshp to perform this action: View user permissions on a resource
```

PAT 错误, 也可能是账号错误


##### 401 Error

```
Error: Failed request: (401)
```

PAT 设置里面没有选择'all accessible'
