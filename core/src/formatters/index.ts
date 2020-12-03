import {
  CHINESE_CHARS,
  ALPHABETICAL_AND_NUM,
  WHITE_SPACE,
  STAR,
  NOT_WHITE_SPACE,
  LINE_BREAK,
  SPACE_CHAR,
  LEFT_OPEN_PAREN,
  RIGHT_OPEN_PAREN,
  LEFT_OPEN_BARCKET,
  RIGHT_OPEN_BARCKET,
  LEFT_OPEN_PAREN_CN,
  RIGHT_OPEN_PAREN_CN,
  GRAVE,
  COMMA,
  PERIOD,
  PERIOD_CN,
  EXCLAMATION,
  EXCLAMATION_CN,
  COMMA_CN,
  QUESTION_MARK,
  QUESTION_MARK_CN,
  COLON,
  SEMICOLON,
} from "../data/regexSet";
import { getFullWidthCharsMapping } from "../data/fullwidthCharsMapping";
import { BishengMainConfig, BishengMainFeature } from "../types";
import {
  group,
  set,
  not,
  zeroOrMany,
  zeroOrOne,
  multiple,
  oneOrMany,
  compose,
} from "./regexUtils";

const DEBUG = 0;
const DEBUG_SINGLE_SCHEMA: string = "boldTextBlock";

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

  /**
   * @name replaceSchema
   * @format
   *  [schemaName]: [regex, replaceValue, relaceFlag(global or multiline, etc)][];
   */

  const replaceSchema: {
    [schemaName: string]: [string, string, string?][];
  } = {
    markdownLinksInFullWidth: [
      [
        compose(
          LEFT_OPEN_BARCKET,
          group(oneOrMany(set(not(RIGHT_OPEN_BARCKET)))),
          RIGHT_OPEN_BARCKET,
          set(LEFT_OPEN_PAREN, LEFT_OPEN_PAREN_CN),
          group(oneOrMany(set(not(RIGHT_OPEN_PAREN)))),
          set(RIGHT_OPEN_PAREN, RIGHT_OPEN_PAREN_CN)
        ),
        "[$1]($2)",
      ],
    ],
    boldTextBlock: [
      [
        compose(
          zeroOrMany(set(SPACE_CHAR, "\\f\\r\\t\\v")),
          group(STAR, STAR, zeroOrMany(set(not(STAR))), STAR, STAR),
          zeroOrMany(set(SPACE_CHAR, "\\f\\r\\t\\v"))
        ),
        "$1",
      ],
      ["\\-\\*\\*", "- **"],
    ],
    blankLines: [
      [
        multiple(group(oneOrMany(WHITE_SPACE), oneOrMany(LINE_BREAK)), 3),
        "\n\n",
      ],
    ],
    duplicatedPunctuations: ([
      [set(PERIOD, PERIOD_CN), "."],
      [set(EXCLAMATION, EXCLAMATION_CN), "!"],
      [set(QUESTION_MARK, QUESTION_MARK_CN), "?"],
    ] as [string, string, number?][]).map<[string, string]>(
      // Default to clean the punctuations duplicated for 3 times
      ([regexToReplace, replaceValue, duplicatedTimes = 3]) => [
        multiple(regexToReplace, duplicatedTimes),
        Array(ellipsisCount).fill(replaceValue).join(""),
      ]
    ),
    fullWidthCharsAndFollowingSpaces: getFullWidthCharsMapping({
      useSimpleQuotation,
    }).map<[string, string]>(([cnSign, enSign]) => [
      group(cnSign, zeroOrMany(SPACE_CHAR)),
      enSign,
    ]),
    halfWidthCharsAndFollowingSpaces: [
      [compose(COMMA, zeroOrMany(SPACE_CHAR)), ", "],
      [
        compose(
          zeroOrMany(set(SPACE_CHAR, "\\f\\r\\t\\v")),
          group(
            GRAVE,
            zeroOrOne(oneOrMany(set(not(GRAVE, LINE_BREAK)))),
            GRAVE
          ),
          zeroOrMany(set(SPACE_CHAR, "\\f\\r\\t\\v"))
        ),
        " $1 ",
      ],
    ].map<[string, string]>(([before, after]) => [`${before}`, `${after}`]),
    addSpacesBetweenChineseCharAndAlphabeticalChar: [
      [
        compose(
          group(
            set(
              ALPHABETICAL_AND_NUM,
              RIGHT_OPEN_BARCKET,
              EXCLAMATION,
              SEMICOLON,
              COMMA,
              PERIOD,
              COLON,
              QUESTION_MARK,
              RIGHT_OPEN_PAREN
            )
          ),
          group(set(CHINESE_CHARS))
        ),
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

  Object.keys(replaceSchema).forEach((schema) => {
    replaceSchema[schema].forEach(([regexStr, replace, flags]) => {
      if (mainFeature[schema] === true) {
        const regex = new RegExp(regexStr, flags || "g");
        content = content.replace(regex, replace);

        if (
          DEBUG &&
          (schema === DEBUG_SINGLE_SCHEMA || DEBUG_SINGLE_SCHEMA === "")
        ) {
          console.log(regex);
          console.log(content);
        }
      }
    });
  });

  return content;
};

export const format = (content: string, config?: BishengMainConfig): string => {
  return biShengFormat(content, config);
};
