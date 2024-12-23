# Project Bisheng - NPM Package

> '毕昇'-中英文混排工具核心 NPM 包

- [Project Bisheng - NPM Package](#project-bisheng---npm-package)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Configuration](#configuration)
  - [Dev](#dev)
  - [Feature Example](#feature-example)
    - [boldTextBlock = true](#boldtextblock--true)
    - [duplicatedPunctuations = true](#duplicatedpunctuations--true)
    - [fullWidthCharsAndFollowingSpaces = true](#fullwidthcharsandfollowingspaces--true)
    - [halfWidthCharsAndFollowingSpaces = true](#halfwidthcharsandfollowingspaces--true)
    - [ellipsisCount = 6](#ellipsiscount--6)
    - [useSimpleQuotation = true](#usesimplequotation--true)

## Installation

``` 
npm i bisheng-formatter-core -S
yarn add bisheng-formatter-core -S
```

## Usage

``` js
import { bishengFormat } from "bisheng-formatter-core";

const str = "在这里可以放上一堆 CN 和 EN 混排的文本. ";

const formattedContent = bishengFormat(str)
console.log(formattedContent);
```

### Configuration


```JS
const config = {
  mainFeature: {
    markdownLinksInFullWidth: true, 
    boldTextBlock: true, 
    blankLines: true, 
    duplicatedPunctuations: true, 
    fullWidthCharsAndFollowingSpaces: true, 
    halfWidthCharsAndFollowingSpaces: true, 
    addSpacesBetweenChineseCharAndAlphabeticalChar: true, 
  }, 
  ellipsisCount: 3, 
  useSimpleQuotation: false, 
};

const formattedContent = bishengFormat("在这里可以放上一堆CN和EN混排的文本。", config)
console.log(formattedContent);

```



| Attr                     | 属性    | 功能                         | 例子 |
| ------------------------ | ------- | ---------------------------- | ---- |
| markdownLinksInFullWidth | boolean | 是否格式化全角 markdown 链接 |      |
| boldTextBlock            | boolean | 是否在粗体两侧添加空格       |      |
| blankLines            | boolean | 是否清空连续的空行       |      |
| duplicatedPunctuations            | boolean | 是否格式化连续的标点符号       |      |
| ellipsisCount            |  number | 如果 duplicatedPunctuations = true, 替换用的连续的符号数目       |      |
| fullWidthCharsAndFollowingSpaces            | boolean | 是否格式化全角符号/数字/英文字符       |      |
| halfWidthCharsAndFollowingSpaces            | boolean | 是否格式化半角符号/数字/英文字符      |      |
| addSpacesBetweenChineseCharAndAlphabeticalChar            | boolean | 是否在中文和英文之间添加空格      |      |
| useSimpleQuotation            | boolean | 是否使用常用标点替换全角引号      |      |


## Dev

``` 
npm i
```


## Feature Example

### boldTextBlock = true

```
是否在粗体两侧添加空格

before: 这里是**粗体**文本
after: 这里是 **粗体** 文本
```

### duplicatedPunctuations = true


```
是否格式化连续的标点符号: 一般是多个句号组成的省略号 (。。。。。) 以及多个感叹号或问号

before: 这里是一段中文带着很多很多的感叹号和问号！！！！!!!!！！！？？????????？？？？
after: 这里是一段中文带着很多很多的感叹号和问号!!!???
```

### fullWidthCharsAndFollowingSpaces = true

```
是否格式化全角符号/数字/英文字符

before: 这里是一段中文，带着中文符号。这里是一段ChineseText！带着中文符号？
after: 这里是一段中文, 带着中文符号. 这里是一段 ChineseText! 带着中文符号?
```
### halfWidthCharsAndFollowingSpaces = true

```
是否格式化半角符号/数字/英文字符

before: 这一幕被一楼 DHBM 系统监控到,30 秒内关闭了系统.
after: 这一幕被一楼 DHBM 系统监控到, 30 秒内关闭了系统.
```

### ellipsisCount = 6

```
如果 duplicatedPunctuations = true, 决定替换成多少个连续的符号

(如果设置为 6) 
before: 这里是一段中文带着很多很多的感叹号和问号！！！!!!!!!!！！！！！！！！
after: 这里是一段中文带着很多很多的感叹号和问号!!!!!!
```


### useSimpleQuotation = true


```
是否使用常用标点替换全角引号

true: 使用 (""'') 替换 (“”‘’)
false: 使用 (『』「」) 替换 (“”‘’)
```