/**
 * @name regexSets
 * @desc 
 *  Use below char set only in JS regex as string.
 * @caution
 *  Only use RegExp() to generate the regex string for below set
 *  For some regex below we have TWO ESCAPE CHARS, one for JS string and one for regex 
 * @example
 *  const regex = new RegExp(regexStr, "g"); 
 *  content.replace(regex, replace);
 */
export const CHINESE_CHARS = "\\u4e00-\\u9fa5\\u3040-\\u30FF";
export const ALPHABETICAL_AND_NUM = "a-zA-Z0-9";
export const WHITE_SPACE = "\\s";
export const NOT_WHITE_SPACE = "\\S";
export const STAR = "\\*";
export const LINE_BREAK = "\\n";
export const SPACE_CHAR = " ";
export const BACK_SLASH = "\\";
export const LEFT_OPEN_PAREN = "\\(";
export const LEFT_OPEN_PAREN_CN = "（";
export const RIGHT_OPEN_PAREN_CN = "）";
export const RIGHT_OPEN_PAREN = "\\)";
export const LEFT_OPEN_BARCKET = "\\[";
export const RIGHT_OPEN_BARCKET = "\\]";
export const COMMA = ",";
export const COMMA_CN = "，";
export const GRAVE = "`";
export const PERIOD = "\\.";
export const COLON = ":";
export const SEMICOLON = ";";
export const PERIOD_CN = "。";
export const EXCLAMATION = "!";
export const EXCLAMATION_CN = "！";
export const QUESTION_MARK = "\\?";
export const QUESTION_MARK_CN = "？";
