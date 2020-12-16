/* eslint-disable import/prefer-default-export */
import { bishengFormat } from 'bisheng-formatter-core';
import { debounce } from 'lodash';
import { defaultConfig } from '../../constants/config';
import MESSAGE from '../../constants/messageTypes';
import SETUP from '../../constants/setup';
import { getStorage } from '../../utils/configManager';
import './style.scss';

const DEBUG = {
  ACTIVE: false,
  KEYWORD: '',
};

let textNodes: Node[] = [];

const getAllTextNodes = (nodes: Node[]) => {
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

const formatNode = (node: Node, config: { [key: string]: string | boolean }) => {
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
          duplicatedPunctuations: config.duplicatedPunctuations === true,
          fullWidthCharsAndFollowingSpaces: config.fullWidthCharsAndFollowingSpaces === true,
          addSpacesBetweenChineseCharAndAlphabeticalChar:
            config.addSpacesBetweenChineseCharAndAlphabeticalChar === true,
          halfWidthCharsAndFollowingSpaces: config.halfWidthCharsAndFollowingSpaces === true,
        },
      };
      formattedText = bishengFormat(textValue, bishengConfig);
      const keywordRegex = config.keywordRegex as string;
      const keywordRegexToReplace = config.keywordRegexToReplace as string;

      /* Experimental Feature */
      if (keywordRegex.length > 0) {
        const regExp = new RegExp(config.keywordRegex as string, 'g');

        const matched = formattedText.match(regExp);
        if (matched !== null) {
          if (config.keywordReplaceByElem === true) {
            /* Hide parent elem */
            _node.parentElement?.classList.add('bisheng_hide');
          }

          if (config.keywordReplaceByChar === true) {
            /* Replace keywords */
            formattedText = formattedText.replace(
              regExp,
              keywordRegexToReplace.length > 0
                ? keywordRegexToReplace
                : new Array(matched[0].length).fill('█').join(''),
            );
          }
        }
      }

      if (textValue !== formattedText) {
        _node[textAttribute] = formattedText;
      }
    }
  }
};

export const activeAutoFormat = (config: { [key: string]: string | boolean }): void => {
  const debouncedFormatNodes = debounce(formatNodes, 3000);

  const mutationHandler: MutationCallback = (mutationList) => {
    const addedNodeLists = mutationList.map((mutation) => mutation.addedNodes);

    addedNodeLists.forEach((addedNodeList) => {
      [...addedNodeList].forEach((e) => textNodes.push(e));
    });

    /* Trigger the invoke when mutated */
    debouncedFormatNodes(config);
  };

  const observer = new MutationObserver(mutationHandler);

  /* Mutation Observe Start: collect all new nodes */
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  /* Trigger the first invoke */
  debouncedFormatNodes(config);
};

const formatNodes = (config: { [key: string]: string | boolean }) => {
  getAllTextNodes([document.documentElement]);

  textNodes.forEach((e) => formatNode(e, config));
  if (DEBUG.ACTIVE) console.log('config:', config);
  if (DEBUG.ACTIVE) console.log('Formated', textNodes.length);
  /* Clear the nodes after formatted */
  textNodes = [];
};

getStorage(SETUP.STORAGE_KEY, (res) => {
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
