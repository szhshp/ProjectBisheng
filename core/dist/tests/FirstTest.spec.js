"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatters_1 = require("../formatters");
describe('全角替换', function () {
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
    ].forEach(function (_a) {
        var desc = _a.desc, before = _a.before, after = _a.after;
        test(desc, function () {
            expect(formatters_1.format(before)).toEqual(after);
        });
    });
});
describe('符号替换', function () {
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
            before: '这里是一段中文带着很长很长的省略号。。。。。。。。。..............',
            after: '这里是一段中文带着很长很长的省略号......'
        },
        {
            desc: '复符号替换2',
            before: '毕昇发明印刷术!!!!!!!!!!！！！！！！！',
            after: '毕昇发明印刷术!!!'
        },
        {
            desc: '复符号替换3',
            before: '这里是一段中文带着很多很多的感叹号和问号！！！！！！！？？？？？？',
            after: '这里是一段中文带着很多很多的感叹号和问号!!!???'
        },
        {
            desc: '全角引号替换',
            before: '“这里”是一段“中文”带着‘全角引号’',
            after: '『这里』是一段『中文』带着「全角引号」'
        },
        {
            desc: '链接错误格式修复',
            before: '[这里是乱写的链接](fakesite.com)+[全角括号的链接]（fakesite.com）',
            after: '[这里是乱写的链接](fakesite.com)+[全角括号的链接](fakesite.com)'
        }
    ].forEach(function (_a) {
        var desc = _a.desc, before = _a.before, after = _a.after;
        test(desc, function () {
            expect(formatters_1.format(before)).toEqual(after);
        });
    });
});
describe('文本混排', function () {
    [
        {
            desc: '中英文之间添加空格',
            before: '这里是一段A中文和B英文混C排的文本',
            after: '这里是一段 A 中文和 B 英文混 C 排的文本'
        },
        {
            desc: '替换全角符号+中英文之间添加空格',
            before: '这里是一段中文，带着中文符号。这里是一段ChineseText！带着Chinese Punctuations？',
            after: '这里是一段中文, 带着中文符号. 这里是一段 ChineseText! 带着 Chinese Punctuations? '
        },
        {
            desc: '格式化 Markdown 链接',
            before: '这里是[全角符号的链接1]（fakesite.com）和[链接2](fakesite.com)后面还有一段文字',
            after: '这里是 [全角符号的链接 1](fakesite.com) 和 [链接 2](fakesite.com) 后面还有一段文字'
        }
    ].forEach(function (_a) {
        var desc = _a.desc, before = _a.before, after = _a.after;
        test(desc, function () {
            expect(formatters_1.format(before)).toEqual(after);
        });
    });
});
describe('清除空行', function () {
    [
        {
            desc: '清除空行',
            before: "\n      \u672B\u5C3E\u9644\u5E26\u5F88\u591A\u7A7A\u884C\u7684\u6587\u672C\u6E05\u7406\u4E4B\u540E\u5E94\u8BE5\u53EA\u5269\u4E00\u884C\n      \n      \n      \n      ",
            after: "\n      \u672B\u5C3E\u9644\u5E26\u5F88\u591A\u7A7A\u884C\u7684\u6587\u672C\u6E05\u7406\u4E4B\u540E\u5E94\u8BE5\u53EA\u5269\u4E00\u884C\n      "
        },
        {
            desc: '清除空行 + 标点格式化',
            before: "\n      \u672B\u5C3E\u9644\u5E26\u5F88\u591A\u7A7A\u884C\u7684\u6587\u672C,\u6E05\u7406\u4E4B\u540E\u5E94\u8BE5\u53EA\u52691\u884C\uFF01\n      \n      \n      \n      ",
            after: "\n      \u672B\u5C3E\u9644\u5E26\u5F88\u591A\u7A7A\u884C\u7684\u6587\u672C, \u6E05\u7406\u4E4B\u540E\u5E94\u8BE5\u53EA\u5269 1 \u884C! "
        },
        {
            desc: '实际 Markdown 格式化',
            before: "\n---\ntitle: Git Pages \u53D1\u5E03\u540E 404 Error\ntags: [Github, Pages]\n---\n\n\u5173\u4E8EPages\u53D1\u5E03\u540E\u5F88\u591A\u6587\u4EF6404\u9519\u8BEF\n\nGithub\u53D1\u5E03\u4E4B\u540E\u53D1\u73B0JS,CSS\u5168\u90E8404,\u56E0\u4E3A\u53D1\u5E03\u7684 URL \u662F `https://szhielelp.github.io/ProjectGaia/` \u7136\u800C JS \u548C CSS \u653E\u5230\u4E86\u6839\u76EE\u5F55\u4E0B\u9762 `https://szhielelp.github.io/js/`\n\n## Solution 1\n\n\u4FEE\u6539\u4E00\u4E0B\u6240\u6709\u8DEF\u5F84, \u6DFB\u52A0\u51E0\u4E2A\u53D8\u91CF:{{site.url}}\n\n\u9EBB\u70E6\u7684\u5C31\u662F\u672C\u5730Debug\u8BC6\u522B\u4E0D\u51FAlocalhost\u8FD9\u4E2Aurl\n\n## Solution2\n\n\u53EF\u4EE5\u8BBE\u7F6Ebaseurl\u4E3Arepo\u540D\u5B57\uFF0C\u4E00\u6B21\u6027\u89E3\u51B3\u6240\u6709\u95EE\u9898\uFF0Csite.url\u90FD\u4E0D\u9700\u8981\u4E86\n\nCoding Pages\u4E0D\u9700\u8981\u8FD9\u6837\u5904\u7406\n",
            after: "\n---\ntitle: Git Pages \u53D1\u5E03\u540E 404 Error\ntags: [Github, Pages]\n---\n\n\u5173\u4E8E Pages \u53D1\u5E03\u540E\u5F88\u591A\u6587\u4EF6 404 \u9519\u8BEF\n\nGithub \u53D1\u5E03\u4E4B\u540E\u53D1\u73B0 JS,CSS \u5168\u90E8 404, \u56E0\u4E3A\u53D1\u5E03\u7684 URL \u662F `https://szhielelp.github.io/ProjectGaia/` \u7136\u800C JS \u548C CSS \u653E\u5230\u4E86\u6839\u76EE\u5F55\u4E0B\u9762 `https://szhielelp.github.io/js/`\n\n## Solution 1\n\n\u4FEE\u6539\u4E00\u4E0B\u6240\u6709\u8DEF\u5F84, \u6DFB\u52A0\u51E0\u4E2A\u53D8\u91CF:{{site.url}}\n\n\u9EBB\u70E6\u7684\u5C31\u662F\u672C\u5730 Debug \u8BC6\u522B\u4E0D\u51FA localhost \u8FD9\u4E2A url\n\n## Solution2\n\n\u53EF\u4EE5\u8BBE\u7F6E baseurl \u4E3A repo \u540D\u5B57, \u4E00\u6B21\u6027\u89E3\u51B3\u6240\u6709\u95EE\u9898, site.url \u90FD\u4E0D\u9700\u8981\u4E86\n\nCoding Pages \u4E0D\u9700\u8981\u8FD9\u6837\u5904\u7406\n"
        },
        {
            desc: '代码段应该不受影响',
            before: "\n``` html\n<!-- jQuery -->\n<script src=\"{{site.url}}{{site.baseurl}}/js/jquery.js\"></script>\n\n<!-- Bootstrap Core JavaScript -->\n<script src=\"{{site.url}}{{site.baseurl}}/js/bootstrap.min.js\"></script>\n\n<!-- Custom Theme JavaScript -->\n<script src=\"{{site.url}}{{site.baseurl}}/js/custom.js\"></script>\n```\n",
            after: "\n``` html\n<!-- jQuery -->\n<script src=\"{{site.url}}{{site.baseurl}}/js/jquery.js\"></script>\n\n<!-- Bootstrap Core JavaScript -->\n<script src=\"{{site.url}}{{site.baseurl}}/js/bootstrap.min.js\"></script>\n\n<!-- Custom Theme JavaScript -->\n<script src=\"{{site.url}}{{site.baseurl}}/js/custom.js\"></script>\n```\n"
        }
    ].forEach(function (_a) {
        var desc = _a.desc, before = _a.before, after = _a.after;
        test(desc, function () {
            expect(formatters_1.format(before)).toEqual(after);
        });
    });
});
