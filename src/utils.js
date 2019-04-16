export function sendClickMessage(action) {
  try {
    if (!action) {
      console.warn('1st argument of function sendClickMessage is missing. Required Format { type: <>, payload: <> }');
      return false;
    } else if (!action.type) {
      console.warn('action.type is missing. Required Format { type: <>, payload: <> }');
      return false;
    }
    // chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, action);
    // });
    chrome.runtime.sendMessage(action);
  } catch (e) {
    console.warn('chrome.tabs is not defined');
  }
}

export const loadState = () => {
  try {
    const jsonStr = localStorage.getItem('state');
    if (jsonStr === null) {
      return undefined;
    }
    return JSON.parse(jsonStr);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const json = JSON.stringify(state);
    localStorage.setItem('state', json);
  } catch (e) {
  }
}
