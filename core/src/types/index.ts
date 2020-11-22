/* export enum Language {
  en = 'en',
  cn = 'cn',
} */

export type BishengMainFeatureSet =
| 'markdownLinksInFullWidth'
| 'boldTextBlock'
| 'blankLines'
| 'duplicatedPunctuations'
| 'fullWidthCharsAndFollowingSpaces'
| 'addSpacesBetweenChineseCharAndAlphabeticalChar';

export type BishengMainFeature = {
  [key in BishengMainFeatureSet]?: boolean;
};

export type BishengMainConfig = {
  mainFeature?: BishengMainFeature;
  useSimpleQuotation?: boolean;
  ellipsisCount?: 3 | 6;
};
