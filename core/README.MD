# Project Bisheng - NPM Package

> '毕昇'-中英文混排工具核心 NPM 包

- [Project Bisheng - NPM Package](#project-bisheng---npm-package)
  - [Installation](#installation)
  - [Basic Usage](#basic-usage)
    - [Configuration](#configuration)
  - [Dev](#dev)

## Installation

``` 

npm i bisheng-formatter-core -S
```

## Basic Usage

``` js
const {
  bishengFormat
} = require("bisheng-formatter-core");
/* import { bishengFormat } from "bisheng-formatter-core"; */

const formattedContent = bishengFormat("在这里可以放上一堆CN和EN混排的文本。")
console.log(formattedContent);
```

### Configuration

``` JS
const config = {
  mainFeature: {
    /* 
      决定是否格式化全角 markdown 链接
      before: [title]（link）
      after: [title](link)
    */
    markdownLinksInFullWidth: true,

    /* 
      决定是否在粗体两侧添加空格
      before: 这里是**粗体**文本
      after: 这里是 **粗体** 文本
    */
    boldTextBlock: true,

    /* 决定是否清空连续的空行 */
    blankLines: true,

    /*  
      决定是否格式化连续的标点符号: 一般是多个句号组成的省略号 (。。。。。) 以及多个感叹号或问号。
      before: 这里是一段中文带着很多很多的感叹号和问号！！！！!!!!！！！？？????????？？？？
      after: 这里是一段中文带着很多很多的感叹号和问号!!!???
     */
    duplicatedPunctuations: true,

    /* 决定是否格式化全角符号/数字/英文字符 */
    fullWidthCharsAndFollowingSpaces: true,

    /* 决定是否在中文和英文之间添加空格 */
    addSpacesBetweenChineseCharAndAlphabeticalChar: true
  },

  /* 
    如果 duplicatedPunctuations = true, 决定替换成多少个连续的符号
    如果设置为 6 
      before: 这里是一段中文带着很多很多的感叹号和问号！！！!!!!!!!！！！！！！！！
      after: 这里是一段中文带着很多很多的感叹号和问号!!!!!!
   */
  ellipsisCount: 3,
  useSimpleQuotation: false
}

const formattedContent = bishengFormat("在这里可以放上一堆CN和EN混排的文本。", config)
console.log(formattedContent);
```

## Dev

``` 

npm i
```
