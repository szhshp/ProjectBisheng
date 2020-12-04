import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';

import './App.scss';
import MESSAGE from '../constants/MessageTypes';

const App = () => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setActiveTab(tabs[0]);
    });
  }, []);

  const onClick = () => {
    if (activeTab?.id) {
      chrome.tabs.sendMessage(activeTab.id, {
        type: MESSAGE.FORMAT,
      });
    }
  };

  return (
    <div className="app">
      <h1 className="title">Bisheng Formatter</h1>
      <button onClick={onClick} type="button">
        Format
      </button>
    </div>
  );
};

export default hot(App);
