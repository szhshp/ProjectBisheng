import { Language } from '../types'

/**
 * @name removeBlankLinesAtTheEnd
 * @desc Remove multiple blank lines in the end of the content
 */
export const removeBlankLinesAtTheEnd = (content: string): string => {
  content = content.replace(/^(.*)(\r?\n\1)+$/gm, '$1')
  return content
}

/**
 * @name replacePunctuations
 * @desc Add extra space after punctuations
 */
export const replacePunctuations = (
  content: string,
  from: Language = Language.cn,
  to: Language = Language.en
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

  const replaceList: [string, string][] = [
    [`([${CHINESE_CHARS}][*]*)([${ALPHABETICAL_AND_NUM}\\[\\(])`, '$1 $2'],
    ['\\[([^\\]]+)\\][（(]([^)]+)[）)]', '[$1]($2)'],

    /* Remove multiple duplicated punctuations */
    ...[
      ['。', '......'],
      ['\\.', '......'],
      ['！', '!!!'],
      ['\\!', '!!!'],
      ['？', '???'],
      ['\\?', '???'],
      ['，', '，']
    ].map<[string, string]>(([toReplace, replaceValue]) => [
      `${toReplace}{3,}`,
      replaceValue
    ]),
    ...[
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

    ].map<[string, string]>(([cnSign, enSign]) => [
      `${cnSign}\\s*`,
      `${enSign}`
    ]),
    [
      `([${ALPHABETICAL_AND_NUM}\\]!;\\,\\.\\:\\?\\)])([*]*[${CHINESE_CHARS}])`,
      '$1 $2'
    ],
    [
      `([${CHINESE_CHARS}][*]*)([${ALPHABETICAL_AND_NUM}\\[\\(])`,
      '$1 $2'
    ]
  ]

  replaceList.forEach(([regexStr, replace]) => {
    const regex = new RegExp(regexStr, 'g')
    content = content.replace(regex, replace)
  })

  return content
}

export const format = (content: string): string => {
  let formattedContent = removeBlankLinesAtTheEnd(content)
  formattedContent = replacePunctuations(formattedContent)

  return formattedContent
}
