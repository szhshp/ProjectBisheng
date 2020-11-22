import { getFullWidthCharsMapping } from '@src/data/fullwidthCharsMapping'
import { BishengMainConfig, BishengMainFeature } from '@src/types'

const DEBUG = 0

/**
 * @name replacePunctuations
 * @desc Add extra space after punctuations
 */
export const biShengFormat = (
  content: string,
  config: BishengMainConfig
): string => {
  const ellipsisCount = config?.ellipsisCount || 3
  const useSimpleQuotation = config?.useSimpleQuotation
  const mainFeature: BishengMainFeature = config?.mainFeature || {
    markdownLinksInFullWidth: true,
    boldTextBlock: true,
    blankLines: true,
    duplicatedPunctuations: true,
    fullWidthCharsAndFollowingSpaces: true,
    halfWidthCharsAndFollowingSpaces: true,
    addSpacesBetweenChineseCharAndAlphabeticalChar: true
  }

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
    boldTextBlock: [['\\s*(\\*\\*[^\\*]*?\\*\\*)\\s*', ' $1 ']],
    blankLines: [['(\\s+\\n){3,}', '\n\n']],
    duplicatedPunctuations: [
      ['。', Array(ellipsisCount).fill('.').join('')],
      ['\\.', Array(ellipsisCount).fill('.').join('')],
      ['！', Array(ellipsisCount).fill('!').join('')],
      ['\\!', Array(ellipsisCount).fill('!').join('')],
      ['？', Array(ellipsisCount).fill('?').join('')],
      ['\\?', Array(ellipsisCount).fill('?').join('')],
      ['，', '，']
    ].map<[string, string]>(([toReplace, replaceValue]) => [
      `${toReplace}{3,}`,
      replaceValue
    ]),
    fullWidthCharsAndFollowingSpaces: getFullWidthCharsMapping({
      useSimpleQuotation
    }).map<[string, string]>(([cnSign, enSign]) => [
      `${cnSign}[ ]*`,
      `${enSign}`
    ]),
    halfWidthCharsAndFollowingSpaces: [[',', ', ']].map<[string, string]>(
      ([before, after]) => [`${before}[ ]*`, `${after}`]
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
      if (mainFeature[key] === true) {
        const regex = new RegExp(regexStr, flags || 'g')
        content = content.replace(regex, replace)
      }
    })
    if (DEBUG) {
      console.log('--------------AFTER--------------')
      console.log(content)
    }
  })

  return content
}

export const format = (content: string, config?: BishengMainConfig): string => {
  return biShengFormat(content, config)
}
