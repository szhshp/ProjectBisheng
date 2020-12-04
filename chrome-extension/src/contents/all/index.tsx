import { bishengFormat } from 'bisheng-formatter-core';
import MESSAGE from '../../constants/MessageTypes';
import './style.scss';

const DEBUG = {
  ACTIVE: false,
  KEYWORD: '加密',
};

const textNodes: ChildNode[] = [];

const getAllTextNodes = (nodes: HTMLElement[] | ChildNode[]) => {
  nodes.forEach((node) => {
    if (node instanceof HTMLElement) {
      if (
        ['SCRIPT', 'STYLE', 'TEXTAREA', 'META', 'LINK', 'HEAD', 'SVG', 'PATH'].includes(
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

const formatNode = (node: ChildNode) => {
  if (node.hasChildNodes()) return;
  const _node = node;
  let formattedText;
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
    if (DEBUG.ACTIVE === false || (DEBUG.ACTIVE === true && textValue.includes(DEBUG.KEYWORD))) {
      formattedText = bishengFormat(textValue);
      if (textValue !== formattedText) {
        _node[textAttribute] = formattedText;
      }
    }
  }
};

const formatNodes = () => {
  getAllTextNodes([document.documentElement]);
  
  textNodes.forEach((e) => formatNode(e));
};

chrome.runtime.onMessage.addListener((request, sender) => {
  formatNodes();
  if (chrome.runtime.id !== sender.id) {
    return;
  }

  switch (request.type) {
    case MESSAGE.FORMAT:
      break;

    case 'revoke':
      // revoke();
      // manualRevoked = true;
      break;

    case 'startAutoFormat':
      // autoFormat();
      break;

    case 'stopAutoFormat':
      // if (observer) {
      //   observer.disconnect();
      // }
      // revoke();
      break;

    default:
      break;
  }
});
