import { Language } from "./types";

/**
 * @name removeBlankLinesAtTheEnd
 * @desc Remove multiple blank lines in the end of the content
 */
export const removeBlankLinesAtTheEnd = (content: string): string => {
  content = content.replace(/^(.*)(\r?\n\1)+$/gm, "$1");
  return content;
};

/**
 * @name replacePunctuations
 * @desc Add extra space after punctuations
 */
export const replacePunctuations = (
  content: string,
  from: Language = Language.cn,
  to: Language = Language.en
): string => {
  /* const punctuations: {
    en: string;
    cn: string;
  }[] = [
    //{en: "." ,cn: "。"}, // handled separately
    { en: ",", cn: "，" },
    { en: ";", cn: "；" },
    { en: "!", cn: "！" },
    { en: "?", cn: "？" },
    { en: "{", cn: "【" },
    { en: "}", cn: "】" },
    { en: "<", cn: "《" },
    { en: ">", cn: "》" },
    { en: "\\", cn: "、" },
  ];

  const punctuationsMap = punctuations.reduce((prev, cur) => {
    prev.set(cur[from], cur[to]);
    return prev;
  }, new Map()); */

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

  const replaceList: [string, string][] = [
    /* TODO: Refactor It */
    [`([\\u4e00-\\u9fa5\\u3040-\\u30FF])，\\s*`, `$1,`],
    [`([\\u4e00-\\u9fa5\\u3040-\\u30FF])；\\s*`, `$1;`],
    [`([\\u4e00-\\u9fa5\\u3040-\\u30FF])！\\s*`, `$1!`],
    [`([\\u4e00-\\u9fa5\\u3040-\\u30FF])：\\s*`, `$1：`],
    [`([\\u4e00-\\u9fa5\\u3040-\\u30FF])、\\s*`, `$1`],
    [`([\\u4e00-\\u9fa5\\u3040-\\u30FF])？\\s*`, `$1?`],
    /* Multiple blanks in end of line */ [
      `([\\u4e00-\\u9fa5\\u3040-\\u30FF])。($|\\s*)`,
      `$1.`,
    ],
    /* Left bracket */
    [`([\\u4e00-\\u9fa5\\u3040-\\u30FF])）`, `$1)`],
    /* Right bracket */
    [`（([\\u4e00-\\u9fa5\\u3040-\\u30FF])`, `($1`],
    /* Multiple ellipsis */
    [`。\\{3,}`, `......`],
    /* Mutiple blank lines in the end of content */
    [`([！？])$1\\{3,}`, `$1$1$1`],
    /* ??? */
    [`([。，；：、“”『』〖〗《》])\\1{1,}`, `$1`],
  ];

  replaceList.forEach(([regexStr, replace]) => {
    const regex = new RegExp(regexStr);
    content = content.replace(regex, replace);
  });

  return content;
};
