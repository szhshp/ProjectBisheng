import { bishengFormat } from 'bisheng-formatter-core';
import { debounce } from 'lodash';
import { defaultConfig } from '../../constants/config';
import MESSAGE from '../../constants/messageTypes';
import SETUP from '../../constants/setup';
import { getStorage } from '../../utils/configManager';
import './style.scss';

const DEBUG = {
  ACTIVE: true,
  KEYWORD: '',
};

const textNodes: ChildNode[] = [];

const getAllTextNodes = (nodes: HTMLElement[] | ChildNode[]) => {
  nodes.forEach((node) => {
    if (node instanceof HTMLElement) {
      if (
        ['SCRIPT', 'STYLE', 'TEXTAREA', 'PRE', 'META', 'LINK', 'HEAD', 'SVG', 'PATH'].includes(
          (node.tagName || '').toUpperCase(),
        )
      ) {
        return;
      }
      if (node.getAttribute && node.getAttribute('contenteditable')) {
        const { activeElement } = document;
        if (activeElement && node.contains(activeElement)) {
          return;
        }
      }
    }
    if (node.hasChildNodes()) {
      getAllTextNodes([...node.childNodes]);
    } else if ([node.ELEMENT_NODE, node.TEXT_NODE].includes(node.nodeType)) {
      textNodes.push(node);
    }
  });
};

export const activeAutoFormat = (config: { [key: string]: string | boolean }) => {
  const debouncedFormat = debounce(formatNodes, 1000);
  const mutationHandler: MutationCallback = (mutationList) => {
    mutationList.forEach(() => {
      debouncedFormat(config);
    });
  };

  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(mutationHandler);
  observer.observe(document.body, observerOptions);
  debouncedFormat(config);
};

const formatNode = (node: ChildNode, config: { [key: string]: string | boolean }) => {
  if (node.hasChildNodes()) return;
  const _node = node;
  let formattedText = '';
  let textAttribute: 'textContent' | 'nodeValue' | undefined;

  switch (_node.nodeType) {
    case 1:
      textAttribute = 'textContent';
      break;
    case 3:
      textAttribute = 'nodeValue';
      break;
    default:
      break;
  }

  if (textAttribute && _node[textAttribute]) {
    const textValue = _node[textAttribute] || '';
    if (DEBUG.KEYWORD === '' || textValue.includes(DEBUG.KEYWORD)) {
      /* Format with Bisheng */
      const bishengConfig = {
        mainFeature: {
          markdownLinksInFullWidth: false,
          boldTextBlock: false,
          blankLines: false,
          duplicatedPunctuations: config['duplicatedPunctuations'] === true,
          fullWidthCharsAndFollowingSpaces: config['fullWidthCharsAndFollowingSpaces'] === true,
          addSpacesBetweenChineseCharAndAlphabeticalChar:
            config['addSpacesBetweenChineseCharAndAlphabeticalChar'] === true,
          halfWidthCharsAndFollowingSpaces: config['halfWidthCharsAndFollowingSpaces'] === true,
        },
      };
      formattedText = bishengFormat(textValue, bishengConfig);

      /* Experimental Feature */
      if (
        config['keywordReplaceByChar'] === true &&
        (config['keywordRegex'] as string).length > 0
      ) {
        const regExp = new RegExp(config['keywordRegex'] as string, 'g');
        formattedText = formattedText.replace(regExp, Array(5).fill('█').join(''));
      }

      if (textValue !== formattedText) {
        _node[textAttribute] = formattedText;
      }
    }
  }
};

const formatNodes = (config: { [key: string]: string | boolean }) => {
  getAllTextNodes([document.documentElement]);

  textNodes.forEach((e) => formatNode(e, config));
  if (DEBUG.ACTIVE) console.log('Fromated', textNodes.length);
};

getStorage(SETUP.STORAGE_KEY, (res) => {
  /* TODO: 😅 居然没法用 Optional Operator, Eslint 少了规则 */
  const config =
    res && res[SETUP.STORAGE_KEY] && Object.keys(res[SETUP.STORAGE_KEY]).length > 0
      ? res[SETUP.STORAGE_KEY]
      : defaultConfig;
  if (config.autoFormat) activeAutoFormat(config);
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (chrome.runtime.id !== sender.id) {
    return;
  }
  switch (request.type) {
    case MESSAGE.FORMAT:
      formatNodes(request.config);
      break;
    case MESSAGE.ACTIVE_AUTOFORMAT:
      activeAutoFormat(request.config);
      break;
    default:
      break;
  }
});
