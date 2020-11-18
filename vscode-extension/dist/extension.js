module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/bisheng-formatter-core/dist/formatters/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/bisheng-formatter-core/dist/formatters/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var types_1 = __webpack_require__(/*! ../types */ "./node_modules/bisheng-formatter-core/dist/types/index.js");
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


/***/ }),

/***/ "./node_modules/bisheng-formatter-core/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/bisheng-formatter-core/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var formatters_1 = __webpack_require__(/*! ./formatters */ "./node_modules/bisheng-formatter-core/dist/formatters/index.js");
exports.default = formatters_1.format;


/***/ }),

/***/ "./node_modules/bisheng-formatter-core/dist/types/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/bisheng-formatter-core/dist/types/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
var Language;
(function (Language) {
    Language["en"] = "en";
    Language["cn"] = "cn";
})(Language = exports.Language || (exports.Language = {}));


/***/ }),

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(/*! vscode */ "vscode");
const bisheng_formatter_core_1 = __webpack_require__(/*! bisheng-formatter-core */ "./node_modules/bisheng-formatter-core/dist/index.js");
const DEBUG = 1;
const getFullRange = (doc) => {
    let start = new vscode.Position(0, 0);
    let end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
    let range = new vscode.Range(start, end);
    return range;
};
const getFullRangeContent = (doc) => doc.getText(getFullRange(doc));
const formatDoc = (editor, edit) => {
    // let editor = vscode.window.activeTextEditor;
    let doc = editor.document;
    if (DEBUG) {
        console.log(getFullRangeContent(doc));
    }
    if (["markdown", "plaintext"].indexOf(doc.languageId) > -1) {
        /* Get Content */
        let formattedContent = getFullRangeContent(doc);
        if (DEBUG) {
            console.log("Before Format");
            console.log(formattedContent);
        }
        /* Format the content */
        formattedContent = bisheng_formatter_core_1.default(formattedContent);
        if (DEBUG) {
            console.log("After Format");
            console.log(formattedContent);
        }
        /* Replace the active content */
        edit.replace(getFullRange(doc), formattedContent);
    }
};
const activate = (context) => {
    console.log("Congratulations, BiSheng Formatter is ready!");
    let disposable = vscode.commands.registerCommand("bisheng-formatter-vscode-extension.helloWorld", () => {
        // Display a message box to the user
        vscode.window.showInformationMessage("BiSheng Formatter: Activated");
    });
    context.subscriptions.push(disposable);
    let formatterDisposable = vscode.commands.registerTextEditorCommand("bisheng-formatter-vscode-extension.format", formatDoc);
    context.subscriptions.push(formatterDisposable);
};
const deactivate = () => { };
module.exports = {
    activate,
    deactivate,
};


/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map