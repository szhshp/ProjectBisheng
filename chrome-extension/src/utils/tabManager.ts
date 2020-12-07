export const getActiveTab = (): Promise<chrome.tabs.Tab> => {
  const activeTab = new Promise<chrome.tabs.Tab>((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
  return activeTab;
};
