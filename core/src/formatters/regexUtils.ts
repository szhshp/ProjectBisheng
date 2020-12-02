export const oneOrMany = (regex: string) => `${regex}+`;
export const zeroOrMany = (regex: string) => `${regex}*`;
export const zeroOrOne = (regex: string) => `${regex}?`;
export const not = (regex: string) => `^${regex}`;
export const set = (regex: string) => `[${regex}]`;
export const group = (regex: string) => `(${regex})`;
export const times = (regex: string, least?: number, most?: number) =>
  `${regex}{${least || ""},${most || ""}}`;
