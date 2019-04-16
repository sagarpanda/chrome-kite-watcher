// chrome.browserAction.onClicked.addListener(buttonClicked);
// function buttonClicked(tab) { }

function checkForValidUrl(tabId) {
   chrome.tabs.get(tabId, info => {
     var a = document.createElement ('a');
     a.href = info.url;
     if (a.hostname === "kite.zerodha.com") {
       chrome.browserAction.setPopup({"tabId": tabId, "popup": "dist/index.html"});
       chrome.browserAction.setIcon({path : "dist/app/icon_red.png"});
     } else {
       chrome.browserAction.setPopup({"tabId": tabId, "popup": "dist/app/unavailable.html"});
       chrome.browserAction.setIcon({path : "dist/app/icon_black.png"});
     }
   });
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.tabs.onActivated.addListener(function(activeInfo) {
  activeTabId = activeInfo.tabId;
  checkForValidUrl(activeInfo.tabId);
});

let activeTabId = null;
let isShowBasePrice = false;
let stockPrices = {};

function updateStockPrices(list) {
  const prices = list.reduce((prev, curr) => {
    const temp = prev;
    temp[curr.name] = curr.price;
    return temp;
  }, {});
  return prices;
}

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(action) {
  if (action.type === 'SHOW_BASE_PRICE') {
    isShowBasePrice = action.payload.isShowBasePrice;
    stockPrices = updateStockPrices(action.payload.favStocks);

    chrome.tabs.sendMessage(
      activeTabId,
      {
        type: 'CON_SHOW_BASE_PRICE',
        payload: {
          isShowBasePrice: isShowBasePrice,
          stockPrices: stockPrices
        }
      }
    );
  } else if(action.type === 'UPDATE_BASE_PRICES') {
    stockPrices = updateStockPrices(action.payload.favStocks);
    if (action.payload.delete) {
      if (activeTabId) {
        chrome.tabs.sendMessage(
          activeTabId,
          {
            type: 'CON_REMOVE_BASE_PRICE',
            payload: action.payload.delete
          }
        );
      }
    }
  }
}


setInterval(() => {
  if (activeTabId) {
    chrome.tabs.sendMessage(
      activeTabId,
      {
        type: 'CON_SHOW_BASE_PRICE',
        payload: {
          isShowBasePrice: isShowBasePrice,
          stockPrices: stockPrices
        }
      }
    );
  }
}, 2000);
