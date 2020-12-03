export const oneOrMany = (...regexes: string[]) => `${regexes.join("")}+`;
export const zeroOrMany = (...regexes: string[]) => `${regexes.join("")}*`;
export const zeroOrOne = (...regexes: string[]) => `${regexes.join("")}?`;
export const not = (...regexes: string[]) => `^${regexes.join("")}`;
export const set = (...regexes: string[]) => `[${regexes.join("")}]`;
export const group = (...regexes: string[]) => `(${regexes.join("")})`;
export const compose = (...regexes: string[]) => regexes.join("");
export const multiple = (regex: string, least?: number, most?: number) =>
  `${regex}{${least || ""},${most || ""}}`;
