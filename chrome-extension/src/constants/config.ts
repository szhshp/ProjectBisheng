export type SettingItemType = {
  key: string;
  desc: string;
  tooltip?: string[];
}[];

export type SettingType = {
  name: string;
  items: SettingItemType;
};

export type LinkType = {
  title: string;
  link: string;
};

export type SettingsType = {
  [index: string]: SettingType;
};

export const defaultConfig = {
  duplicatedPunctuations: true,
  fullWidthCharsAndFollowingSpaces: true,
  halfWidthCharsAndFollowingSpaces: true,
  addSpacesBetweenChineseCharAndAlphabeticalChar: true,
  autoFormat: false,
  useSimpleQuotation: true,
};

const settings: SettingsType = {
  feature: {
    name: '核心功能',
    items: [
      {
        key: 'duplicatedPunctuations',
        desc: '格式化连续的标点符号',
        tooltip: [
          'Before:',
          '这里是一段中文带着很多很多的感叹号和问号！！！！!!!!！！！？？????????？？？？',
          '',
          'After:',
          ' 这里是一段中文带着很多很多的感叹号和问号!!!???',
        ],
      },
      {
        key: 'fullWidthCharsAndFollowingSpaces',
        desc: '格式化全角符号/数字/英文字符',
        tooltip: [
          'Before:',
          '这里是一段中文，带着中文符号。这里是一段ChineseText！带着中文符号？',
          '',
          'After:',
          ' 这里是一段中文, 带着中文符号. 这里是一段 ChineseText! 带着中文符号?',
        ],
      },
      {
        key: 'halfWidthCharsAndFollowingSpaces',
        desc: '格式化半角符号/数字/英文字符',
        tooltip: [
          'Before:',
          '这一幕被一楼 DHBM 系统监控到,30 秒内关闭了系统.',
          '',
          'After:',
          ' 这一幕被一楼 DHBM 系统监控到, 30 秒内关闭了系统.',
        ],
      },
      {
        key: 'addSpacesBetweenChineseCharAndAlphabeticalChar',
        desc: '是否在中文和英文之间添加空格',
      },
    ],
  },
  config: {
    name: '设置',
    items: [
      {
        key: 'autoFormat',
        desc: '对所有页面自动格式化',
        tooltip: ['对所有新打开的页面格式化'],
      },
      {
        key: 'useSimpleQuotation',
        desc: '保持英文引号',
        tooltip: [
          '如果开启了全角符号格式化',
          '默认将全角引号 (“”‘’) 格式化为半角引号 (""\'\')',
          '如果关闭此项, 将全角引号格式化为中文书面引用符号 (『』「」)',
        ],
      },
    ],
  },
};

export const links: LinkType[] = [
  {
    title: 'Github',
    link: 'https://github.com/szhielelp/ProjectBisheng',
  },
  {
    title: 'Blog',
    link: 'https://szhshp.org',
  },
];

export default settings;
