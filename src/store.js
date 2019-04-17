import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import ldThrottle from 'lodash/throttle';
import { loadState, saveState, sendClickMessage } from './utils';

const initialState = {
  initLoad: false,
  isShowBasePrice: false,
  favStocks: [
    {name: 'ASIANPAINT', price: 1400},
    {name: 'AXISBANK', price: 750},
    {name: 'ICICIBANK', price: 390},
    {name: 'INFY', price: 710},
    {name: 'LT', price: 1250},
    {name: 'NAUKRI', price: 1860},
    {name: 'RELIANCE', price: 1330},
    {name: 'SAIL', price: 50},
    {name: 'SBIN', price: 311},
    {name: 'TATAMOTORS', price: 210},
    {name: 'ULTRACEMCO', price: 3500},
    {name: 'YESBANK', price: 264}
  ]
};

function rootReducer(state = initialState, action) {
  let favStocks = [];
  switch (action.type) {
    case 'INIT_LOAD_COMPLETE':
      return { ...state, initLoad: true };
    case 'SHOW_HIDE_BASE_PRICE':
      favStocks = state.favStocks;
      sendClickMessage({ type: 'SHOW_BASE_PRICE', payload: { isShowBasePrice: action.payload, favStocks } });
      return { ...state, isShowBasePrice: action.payload };
    case 'ADD_FAV_STOCK':
      favStocks = [...state.favStocks, action.payload];
      sendClickMessage({ type: 'UPDATE_BASE_PRICES', payload: {favStocks} });
      return { ...state, favStocks };
    case 'DELETE_FAV_STOCK':
      favStocks = state.favStocks.filter(item => (item.name !== action.payload));
      sendClickMessage({ type: 'UPDATE_BASE_PRICES', payload: {favStocks, delete: action.payload} });
      return { ...state, favStocks };
    case 'UPDATE_FAV_STOCK':
      favStocks = state.favStocks.map(item => {
        return item.name == action.payload.name ? action.payload : item;
      });
      sendClickMessage({ type: 'UPDATE_BASE_PRICES', payload: {favStocks} });
      return { ...state, favStocks };
    case 'ADD_ALL_FAV_STOCKS':
      return { ...state, favStocks: action.payload };
    default:
      return state
  }
}

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));
window.store = store;

store.subscribe(
  ldThrottle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
