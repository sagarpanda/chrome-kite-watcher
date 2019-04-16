let isShowBasePrice = false;
let stockPrices = {};

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(action) {
  if (action.type === 'CON_SHOW_BASE_PRICE') {
    isShowBasePrice = action.payload.isShowBasePrice;
    stockPrices = action.payload.stockPrices
    if (action.payload.isShowBasePrice) {
      showBasePrice();
    } else {
      hideBasePrice();
    }
  } else if(action.type === 'CON_REMOVE_BASE_PRICE') {
    findAndRemove(action.payload);
  }
}

function formatedValue(val) {
  return " - " + val;
}

function addBasePrice(elm, price) {
  const fPrice = formatedValue(price);
  const noOfNodes = elm.childNodes.length;
  if (noOfNodes === 1) {
    const node = document.createElement("span");
    const textnode = document.createTextNode(fPrice);
    node.setAttribute('class', 'baseprice');
    node.appendChild(textnode);
    elm.append(node)
  } else {
    elm.childNodes[1].textContent = fPrice;
  }
}

function showBasePrice() {
  const instrumentsElm = document.querySelector('.instruments .vddl-list');
  const list = Array.from(instrumentsElm.children);
  list.forEach(item => {
    const elm = item.firstChild.firstChild.firstChild.firstChild;
    const stockName = elm.firstChild.textContent;
    const stockPrice = stockPrices[stockName];
    if (stockPrice) {
      addBasePrice(elm, stockPrice)
    }
  });
}

function hideBasePrice() {
  const instrumentsElm = document.querySelector('.instruments .vddl-list');
  const list = Array.from(instrumentsElm.children);
  list.forEach(item => {
    const elm = item.firstChild.firstChild.firstChild.firstChild;
    const noOfNodes = elm.childNodes.length;
    if (noOfNodes === 2) {
      elm.childNodes[1].remove();
    }
  });
}

function findAndRemove(name) {
  const instrumentsElm = document.querySelector('.instruments .vddl-list');
  const list = Array.from(instrumentsElm.children);
  list.forEach(item => {
    const elm = item.firstChild.firstChild.firstChild.firstChild;
    const stockName = elm.firstChild.textContent;
    const noOfNodes = elm.childNodes.length;
    if (stockName === name && noOfNodes === 2) {
      elm.childNodes[1].remove();
    }
  });
}
