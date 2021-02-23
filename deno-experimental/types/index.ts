export type BishengMainFeature = {
  [key: string]: boolean;
};

export type BishengMainConfig = {
  mainFeature?: BishengMainFeature;
  useSimpleQuotation?: boolean;
  ellipsisCount?: 3 | 6;
};
