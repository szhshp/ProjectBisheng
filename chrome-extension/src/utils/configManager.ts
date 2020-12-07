export const saveToStorage = (_storage: { [key: string]: any }) => {
  chrome.storage.sync.set(_storage);
};

export const resetStorage = () => chrome.storage.sync.clear();

export const getStorage = (
  keys: string | Object | string[] | null,
  callback: (items: { [key: string]: any }) => void,
) => chrome.storage.sync.get(keys, callback);
