
export type BishengMainFeature = {
  markdownLinksInFullWidth?: boolean;
  boldTextBlock?: boolean;
  blankLines?: boolean;
  duplicatedPunctuations?: boolean;
  fullWidthCharsAndFollowingSpaces?: boolean;
  addSpacesBetweenChineseCharAndAlphabeticalChar?: boolean;
};

export type BishengMainConfig = {
  mainFeature?: BishengMainFeature;
  useSimpleQuotation?: boolean;
  ellipsisCount?: 3 | 6;
};
