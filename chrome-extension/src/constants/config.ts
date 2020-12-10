export enum ConfigItemType {
  Switch,
  TextBox,
}

export type ConfigItem = {
  key: string;
  desc: string;
  tooltip?: string[];
  type: ConfigItemType;
};

export type ConfigItems = ConfigItem[];

export type ConfigType = {
  name: string;
  items: ConfigItems;
};

export type LinkType = {
  title: string;
  link: string;
};

export type AllConfigType = {
  [index: string]: ConfigType;
};

export const defaultConfig: { [index: string]: any } = {
  duplicatedPunctuations: true,
  fullWidthCharsAndFollowingSpaces: true,
  halfWidthCharsAndFollowingSpaces: true,
  addSpacesBetweenChineseCharAndAlphabeticalChar: true,
  autoFormat: false,
  useSimpleQuotation: true,

  /* Experiment Feature  */
  keywordReplaceByChar: false,
  keywordReplaceByElem: false,
  keywordRegex: '肖战|丁真',
};

const configuration: AllConfigType = {
  features: {
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
        type: ConfigItemType.Switch,
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
        type: ConfigItemType.Switch,
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
        type: ConfigItemType.Switch,
      },
      {
        key: 'addSpacesBetweenChineseCharAndAlphabeticalChar',
        desc: '是否在中文和英文之间添加空格',
        type: ConfigItemType.Switch,
      },
    ],
  },
  settings: {
    name: '设置',
    items: [
      {
        key: 'autoFormat',
        desc: '对所有页面自动格式化',
        tooltip: ['对所有新打开的页面格式化'],
        type: ConfigItemType.Switch,
      },
      {
        key: 'useSimpleQuotation',
        desc: '保持英文引号',
        tooltip: [
          '如果开启了全角符号格式化',
          '默认将全角引号 (“”‘’) 格式化为半角引号 (""\'\')',
          '如果关闭此项, 将全角引号格式化为中文书面引用符号 (『』「」)',
        ],
        type: ConfigItemType.Switch,
      },
    ],
  },
  experimental: {
    name: '实验性功能',
    items: [
      {
        key: 'keywordReplaceByChar',
        desc: '隐藏关键字',
        tooltip: ['全网站可搜索的文本中，含有设置的关键字的文本将会被遮挡'],
        type: ConfigItemType.Switch,
      },
      {
        key: 'keywordReplaceByElem',
        desc: '隐藏含有关键字的元素',
        tooltip: ['全网站可搜索的文本中，含有设置的关键字的整个元素将会被遮挡'],
        type: ConfigItemType.Switch,
      },
      {
        key: 'keywordRegex',
        desc: '关键字',
        type: ConfigItemType.TextBox,
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

export default configuration;
