import { fullWidthCharsMapping } from '@src/data/fullwidthCharsMapping'

const DEBUG = 0

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
    markdownLinksInFullWidth: [
      ['\\[([^\\]]+)\\][（(]([^)]+)[）)]', '[$1]($2)']
    ],
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
    ].map<[string, string]>(([toReplace, replaceValue]) => [
      `${toReplace}{3,}`,
      replaceValue
    ]),
    fullWidthCharsAndFollowingSpaces: fullWidthCharsMapping.map<[string, string]>(
      ([cnSign, enSign]) => [`${cnSign}[ ]*`, `${enSign}`]
    ),
    addSpacesBetweenChineseCharAndAlphabeticalChar: [
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
