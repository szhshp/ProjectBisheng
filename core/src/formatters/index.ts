import {
  CHINESE_CHARS,
  ALPHABETICAL_AND_NUM,
  WHITE_SPACE,
  STAR_CHAR,
  NOT_WHITE_SPACE,
  LINE_BREAK,
  SPACE_CHAR,
  LEFT_OPEN_PAREN,
  RIGHT_OPEN_PAREN,
  LEFT_OPEN_BARCKET,
  RIGHT_OPEN_BARCKET,
  LEFT_OPEN_PAREN_CN,
  RIGHT_OPEN_PAREN_CN,
} from "../data/regexSet";
import { getFullWidthCharsMapping } from "../data/fullwidthCharsMapping";
import { BishengMainConfig, BishengMainFeature } from "../types";
import {
  group,
  set,
  not,
  zeroOrMany,
  zeroOrOne,
  times,
  oneOrMany,
} from "./regexUtils";

const DEBUG = 0;

/**
 * @name replacePunctuations
 * @desc Add extra space after punctuations
 */
export const biShengFormat = (
  content: string,
  config: BishengMainConfig
): string => {
  const ellipsisCount = config?.ellipsisCount || 3;
  const useSimpleQuotation = config?.useSimpleQuotation;
  const mainFeature: BishengMainFeature = config?.mainFeature || {
    markdownLinksInFullWidth: true,
    boldTextBlock: true,
    blankLines: true,
    duplicatedPunctuations: true,
    fullWidthCharsAndFollowingSpaces: true,
    halfWidthCharsAndFollowingSpaces: true,
    addSpacesBetweenChineseCharAndAlphabeticalChar: true,
  };

  const replaceSchema: {
    [key: string]: [string, string, string?][];
  } = {
    markdownLinksInFullWidth: [
      [
        `${LEFT_OPEN_BARCKET}${group(
          oneOrMany(set(not(RIGHT_OPEN_BARCKET)))
        )}${RIGHT_OPEN_BARCKET}${set(
          LEFT_OPEN_PAREN + LEFT_OPEN_PAREN_CN
        )}${group(oneOrMany(set(not(RIGHT_OPEN_PAREN))))}${set(
          RIGHT_OPEN_PAREN + RIGHT_OPEN_PAREN_CN
        )}`,
        "[$1]($2)",
      ],
    ],
    boldTextBlock: [
      [
        `${group(set(not(CHINESE_CHARS + ALPHABETICAL_AND_NUM)))}${zeroOrMany(
          WHITE_SPACE
        )}(${STAR_CHAR}${STAR_CHAR}${zeroOrMany(
          set(not(STAR_CHAR))
        )}?${STAR_CHAR}${STAR_CHAR})${zeroOrMany(WHITE_SPACE)}${group(
          zeroOrOne(NOT_WHITE_SPACE)
        )}`,
        "$1 $2$3",
      ],
      [
        `${group(set(CHINESE_CHARS + ALPHABETICAL_AND_NUM))}${zeroOrMany(
          WHITE_SPACE
        )}(${STAR_CHAR}${STAR_CHAR}${zeroOrMany(
          set(not(STAR_CHAR))
        )}?${STAR_CHAR}${STAR_CHAR})${zeroOrMany(WHITE_SPACE)}${group(
          zeroOrOne(NOT_WHITE_SPACE)
        )}`,
        "$1$2$3",
      ],
    ],

    blankLines: [
      [times(group(oneOrMany(WHITE_SPACE) + oneOrMany(LINE_BREAK)), 3), "\n\n"],
    ],
    duplicatedPunctuations: ([
      ["[。\\.]", "."],
      ["[！\\!]", "!"],
      ["[？\\?]", "?"],
      ["，", "，"],
    ] as [string, string, number?][]).map<[string, string]>(
      ([toReplace, replaceValue, multiple = 3]) => [
        times(toReplace, multiple),
        Array(ellipsisCount).fill(replaceValue).join(""),
      ]
    ),
    fullWidthCharsAndFollowingSpaces: getFullWidthCharsMapping({
      useSimpleQuotation,
    }).map<[string, string]>(([cnSign, enSign]) => [
      `${cnSign}${zeroOrMany(SPACE_CHAR)}`,
      `${enSign}`,
    ]),
    halfWidthCharsAndFollowingSpaces: [
      [`,${zeroOrMany(SPACE_CHAR)}`, ", "],
      [
        `${zeroOrMany(SPACE_CHAR)}(\`[^\`\\n]+?\`)${zeroOrMany(SPACE_CHAR)}`,
        " $1 ",
      ],
    ].map<[string, string]>(([before, after]) => [`${before}`, `${after}`]),
    addSpacesBetweenChineseCharAndAlphabeticalChar: [
      [
        `([${ALPHABETICAL_AND_NUM}\\]!;,\\.:\\?${RIGHT_OPEN_PAREN}])([${CHINESE_CHARS}])`,
        "$1 $2",
      ],
      [
        `${group(
          set(CHINESE_CHARS)
        )}([${ALPHABETICAL_AND_NUM}\\[${LEFT_OPEN_PAREN}])`,
        "$1 $2",
      ],
    ],
  };

  Object.keys(replaceSchema).forEach((key) => {
    if (DEBUG) {
      console.log("--------------FORMAT--------------");
      console.log(key);
    }
    replaceSchema[key].forEach(([regexStr, replace, flags]) => {
      if (mainFeature[key] === true) {
        const regex = new RegExp(regexStr, flags || "g");
        content = content.replace(regex, replace);
      }
    });
    if (DEBUG) {
      console.log("--------------AFTER--------------");
      console.log(content);
    }
  });

  return content;
};

export const format = (content: string, config?: BishengMainConfig): string => {
  return biShengFormat(content, config);
};
