import { format } from '@src/formatters'

describe('全角替换', () => {
  [
    {
      desc: '全角字符替换1',
      before: '都２０２０年了谁还用全角写文章',
      after: '都 2020 年了谁还用全角写文章'
    },
    {
      desc: '全角字符替换2',
      before: '都ＡＣ3000年了谁还用全角写文章',
      after: '都 AC3000 年了谁还用全角写文章'
    }

  ].forEach(({ desc, before, after }) => {
    test(desc, () => {
      expect(format(before)).toEqual(after)
    })
  })
})

describe('符号替换', () => {
  [
    {
      desc: '普通全角符号替换',
      before: '这里是一段中文，带着中文符号。这里是一段、中文！带着中文符号？',
      after: '这里是一段中文, 带着中文符号. 这里是一段, 中文! 带着中文符号? '
    },
    {
      desc: '全角括号替换',
      before: '这里是一段中文带着（全角括号）并且括号周围没有空格',
      after: '这里是一段中文带着 (全角括号) 并且括号周围没有空格'
    },
    {
      desc: '重复符号替换1',
      before:
        '这里是一段中文带着很长很长的省略号。。。。。。。。。..............',
      after: '这里是一段中文带着很长很长的省略号......'
    },
    {
      desc: '复符号替换2',
      before: '毕昇发明印刷术!!!!!!!!!!！！！！！！！',
      after: '毕昇发明印刷术!!!'
    },
    {
      desc: '复符号替换3',
      before:
        '这里是一段中文带着很多很多的感叹号和问号！！！！！！！？？？？？？',
      after: '这里是一段中文带着很多很多的感叹号和问号!!!???'
    },
    {
      desc: '全角引号替换',
      before: '“这里”是一段“中文”带着‘全角引号’',
      after: '『这里』是一段『中文』带着「全角引号」'
    },
    {
      desc: '链接错误格式修复',
      before:
        '[这里是乱写的链接](fakesite.com)+[全角括号的链接]（fakesite.com）',
      after: '[这里是乱写的链接](fakesite.com)+[全角括号的链接](fakesite.com)'
    }
  ].forEach(({ desc, before, after }) => {
    test(desc, () => {
      expect(format(before)).toEqual(after)
    })
  })
})

describe('文本混排', () => {
  [
    {
      desc: '中英文之间添加空格',
      before: '这里是一段A中文和B英文混C排的文本',
      after: '这里是一段 A 中文和 B 英文混 C 排的文本'
    },
    {
      desc: '替换全角符号+中英文之间添加空格',
      before:
        '这里是一段中文，带着中文符号。这里是一段ChineseText！带着Chinese Punctuations？',
      after:
        '这里是一段中文, 带着中文符号. 这里是一段 ChineseText! 带着 Chinese Punctuations? '
    },
    {
      desc: '格式化 Markdown 链接',
      before:
        '这里是[全角符号的链接1]（fakesite.com）和[链接2](fakesite.com)后面还有一段文字',
      after:
        '这里是 [全角符号的链接 1](fakesite.com) 和 [链接 2](fakesite.com) 后面还有一段文字'
    }
  ].forEach(({ desc, before, after }) => {
    test(desc, () => {
      expect(format(before)).toEqual(after)
    })
  })
})

describe('清除空行', () => {
  [
    {
      desc: '清除空行',
      before: `
      末尾附带很多空行的文本清理之后应该只剩一行
      
      
      
      `,
      after: `
      末尾附带很多空行的文本清理之后应该只剩一行
      `
    },
    {
      desc: '清除空行 + 标点格式化',
      before: `
      末尾附带很多空行的文本,清理之后应该只剩1行！
      
      
      
      `,
      after: `
      末尾附带很多空行的文本, 清理之后应该只剩 1 行! `
    },
    {
      desc: '实际 Markdown 格式化',
      before: `
---
title: Git Pages 发布后 404 Error
tags: [Github, Pages]
---

关于Pages发布后很多文件404错误

Github发布之后发现JS,CSS全部404,因为发布的 URL 是 \`https://szhielelp.github.io/ProjectGaia/\` 然而 JS 和 CSS 放到了根目录下面 \`https://szhielelp.github.io/js/\`

## Solution 1

修改一下所有路径, 添加几个变量:{{site.url}}

麻烦的就是本地Debug识别不出localhost这个url

## Solution2

可以设置baseurl为repo名字，一次性解决所有问题，site.url都不需要了

Coding Pages不需要这样处理
`,
      after: `
---
title: Git Pages 发布后 404 Error
tags: [Github, Pages]
---

关于 Pages 发布后很多文件 404 错误

Github 发布之后发现 JS,CSS 全部 404, 因为发布的 URL 是 \`https://szhielelp.github.io/ProjectGaia/\` 然而 JS 和 CSS 放到了根目录下面 \`https://szhielelp.github.io/js/\`

## Solution 1

修改一下所有路径, 添加几个变量:{{site.url}}

麻烦的就是本地 Debug 识别不出 localhost 这个 url

## Solution2

可以设置 baseurl 为 repo 名字, 一次性解决所有问题, site.url 都不需要了

Coding Pages 不需要这样处理
`
    },
    {
      desc: '代码段应该不受影响',
      before: `
\`\`\` html
<!-- jQuery -->
<script src="{{site.url}}{{site.baseurl}}/js/jquery.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="{{site.url}}{{site.baseurl}}/js/bootstrap.min.js"></script>

<!-- Custom Theme JavaScript -->
<script src="{{site.url}}{{site.baseurl}}/js/custom.js"></script>
\`\`\`
`,
      after: `
\`\`\` html
<!-- jQuery -->
<script src="{{site.url}}{{site.baseurl}}/js/jquery.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="{{site.url}}{{site.baseurl}}/js/bootstrap.min.js"></script>

<!-- Custom Theme JavaScript -->
<script src="{{site.url}}{{site.baseurl}}/js/custom.js"></script>
\`\`\`
`
    }
  ].forEach(({ desc, before, after }) => {
    test(desc, () => {
      expect(format(before)).toEqual(after)
    })
  })
})
