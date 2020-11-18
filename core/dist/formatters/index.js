"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = exports.replacePunctuations = exports.removeBlankLinesAtTheEnd = void 0;
var types_1 = require("../types");
exports.removeBlankLinesAtTheEnd = function (content) {
    content = content.replace(/^(.*)(\r?\n\1)+$/gm, '$1');
    return content;
};
exports.replacePunctuations = function (content, from, to) {
    if (from === void 0) { from = types_1.Language.cn; }
    if (to === void 0) { to = types_1.Language.en; }
    var CHINESE_CHARS = '\\u4e00-\\u9fa5\\u3040-\\u30FF';
    var ALPHABETICAL_AND_NUM = 'a-zA-Z0-9';
    var replaceList = __spreadArrays([
        ["([" + CHINESE_CHARS + "][*]*)([" + ALPHABETICAL_AND_NUM + "\\[\\(])", '$1 $2'],
        ['\\[([^\\]]+)\\][（(]([^)]+)[）)]', '[$1]($2)']
    ], [
        ['。', '......'],
        ['\\.', '......'],
        ['！', '!!!'],
        ['\\!', '!!!'],
        ['？', '???'],
        ['\\?', '???'],
        ['，', '，']
    ].map(function (_a) {
        var toReplace = _a[0], replaceValue = _a[1];
        return [
            toReplace + "{3,}",
            replaceValue
        ];
    }), [
        ['，', ', '],
        ['；', '; '],
        ['！', '! '],
        ['：', ': '],
        ['、', ', '],
        ['？', '? '],
        ['。', '. '],
        ['）', ') '],
        ['（', ' ('],
        ['【', '『'],
        ['】', '』'],
        ['“', '『'],
        ['”', '』'],
        ['‘', '「'],
        ['’', '」'],
        ['０', '0'],
        ['１', '1'],
        ['２', '2'],
        ['３', '3'],
        ['４', '4'],
        ['５', '5'],
        ['６', '6'],
        ['７', '7'],
        ['８', '8'],
        ['９', '9'],
        ['Ａ', 'A'],
        ['Ｂ', 'B'],
        ['Ｃ', 'C'],
        ['Ｄ', 'D'],
        ['Ｅ', 'E'],
        ['Ｆ', 'F'],
        ['Ｇ', 'G'],
        ['Ｈ', 'H'],
        ['Ｉ', 'I'],
        ['Ｊ', 'J'],
        ['Ｋ', 'K'],
        ['Ｌ', 'L'],
        ['Ｍ', 'M'],
        ['Ｎ', 'N'],
        ['Ｏ', 'O'],
        ['Ｐ', 'P'],
        ['Ｑ', 'Q'],
        ['Ｒ', 'R'],
        ['Ｓ', 'S'],
        ['Ｔ', 'T'],
        ['Ｕ', 'U'],
        ['Ｖ', 'V'],
        ['Ｗ', 'W'],
        ['Ｘ', 'X'],
        ['Ｙ', 'Y'],
        ['Ｚ', 'Z'],
        ['ａ', 'a'],
        ['ｂ', 'b'],
        ['ｃ', 'c'],
        ['ｄ', 'd'],
        ['ｅ', 'e'],
        ['ｆ', 'f'],
        ['ｇ', 'g'],
        ['ｈ', 'h'],
        ['ｉ', 'i'],
        ['ｊ', 'j'],
        ['ｋ', 'k'],
        ['ｌ', 'l'],
        ['ｍ', 'm'],
        ['ｎ', 'n'],
        ['ｏ', 'o'],
        ['ｐ', 'p'],
        ['ｑ', 'q'],
        ['ｒ', 'r'],
        ['ｓ', 's'],
        ['ｔ', 't'],
        ['ｕ', 'u'],
        ['ｖ', 'v'],
        ['ｗ', 'w'],
        ['ｘ', 'x'],
        ['ｙ', 'y'],
        ['ｚ', 'z'],
        ['＠', '@']
    ].map(function (_a) {
        var cnSign = _a[0], enSign = _a[1];
        return [
            cnSign + "\\s*",
            "" + enSign
        ];
    }), [
        [
            "([" + ALPHABETICAL_AND_NUM + "\\]!;\\,\\.\\:\\?\\)])([*]*[" + CHINESE_CHARS + "])",
            '$1 $2'
        ],
        [
            "([" + CHINESE_CHARS + "][*]*)([" + ALPHABETICAL_AND_NUM + "\\[\\(])",
            '$1 $2'
        ]
    ]);
    replaceList.forEach(function (_a) {
        var regexStr = _a[0], replace = _a[1];
        var regex = new RegExp(regexStr, 'g');
        content = content.replace(regex, replace);
    });
    return content;
};
exports.format = function (content) {
    var formattedContent = exports.removeBlankLinesAtTheEnd(content);
    formattedContent = exports.replacePunctuations(formattedContent);
    return formattedContent;
};
