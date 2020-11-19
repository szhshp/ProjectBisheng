const DEBUG = false

/**
 * @name replacePunctuations
 * @desc Add extra space after punctuations
 */
export const biShengFormat = (
  content: string,
  config = {
    ellipsisCount: 3
  }
): string => {
  // [/([\u4e00-\u9fa5\u3040-\u30FF])\.($|\s*)/g, "$1。"],
  // [/([\u4e00-\u9fa5\u3040-\u30FF]),\s*/g, "$1，"],
  // [/([\u4e00-\u9fa5\u3040-\u30FF]);\s*/g, "$1；"],
  // [/([\u4e00-\u9fa5\u3040-\u30FF])!\s*/g, "$1！"],
  // [/([\u4e00-\u9fa5\u3040-\u30FF]):\s*/g, "$1："],
  // [/([\u4e00-\u9fa5\u3040-\u30FF])\?\s*/g, "$1？"],
  // [/([\u4e00-\u9fa5\u3040-\u30FF])\\\s*/g, "$1、"],
  // [/\(([\u4e00-\u9fa5\u3040-\u30FF])/g, "（$1"],
  // [/([\u4e00-\u9fa5\u3040-\u30FF])\)/g, "$1）"],
  // [/。\{3,}/g, "......"],
  // [/([！？])$1{3,}/g, "$1$1$1"],
  // [/([。，；：、“”『』〖〗《》])\1{1,}/g, "$1"],

  const CHINESE_CHARS = '\\u4e00-\\u9fa5\\u3040-\\u30FF'
  const ALPHABETICAL_AND_NUM = 'a-zA-Z0-9'

  const replaceSchema: {
    [key: string]: [string, string, string?][];
  } = {
    markdownLinksInFullWidth: [['\\[([^\\]]+)\\][（(]([^)]+)[）)]', '[$1]($2)']],
    boldTextBlock: [['(?<!\\s)(\\*\\*.*?\\*\\*)(?!\\s)', ' $1 ']],
    blankLines: [['(\\s+\\n){3,}', '\n\n']],
    duplicatedPunctuations: [
      ['。', Array(config.ellipsisCount).fill('.').join('')],
      ['\\.', Array(config.ellipsisCount).fill('.').join('')],
      ['！', '!!!'],
      ['\\!', '!!!'],
      ['？', '???'],
      ['\\?', '???'],
      ['，', '，']
      // ['(\\s*\\n)', '\n']
    ].map<[string, string]>(([toReplace, replaceValue]) => [
      `${toReplace}{3,}`,
      replaceValue
    ]),
    fullWidthChars: [
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
    ].map<[string, string]>(([cnSign, enSign]) => [`${cnSign}`, `${enSign}`]),
    chineseCharAndAlphabeticalChar: [
      [
        `([${ALPHABETICAL_AND_NUM}\\]!;\\,\\.\\:\\?\\)])([*]*[${CHINESE_CHARS}])`,
        '$1 $2'
      ],
      [`([${CHINESE_CHARS}][*]*)([${ALPHABETICAL_AND_NUM}\\[\\(])`, '$1 $2']
    ]
  }

  Object.keys(replaceSchema).forEach((key) => {
    if (DEBUG) {
      console.log('--------------FORMAT--------------')
      console.log(key)
      console.log('--------------BEFORE--------------')
    }
    replaceSchema[key].forEach(([regexStr, replace, flags]) => {
      const regex = new RegExp(regexStr, flags || 'g')
      content = content.replace(regex, replace)
    })
    if (DEBUG) {
      console.log('--------------AFTER--------------')
      console.log(content)
    }
  })

  return content
}

export const format = (content: string): string => {
  return biShengFormat(content)
}
