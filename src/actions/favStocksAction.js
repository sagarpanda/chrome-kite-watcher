export function addInstrument(option) {
  return (dispatch) => {
    dispatch({ type: 'ADD_FAV_STOCK', payload: option });
  };
}

export function updateInstrument(option) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_FAV_STOCK', payload: option });
  };
}

export function deleteInstrument(name) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_FAV_STOCK', payload: name });
  };
}

export function showBasePrice(bool) {
  return (dispatch) => {
    dispatch({ type: 'SHOW_HIDE_BASE_PRICE', payload: bool });
  };
}
