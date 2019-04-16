export function addNewStock() {
  return (dispatch) => {
    dispatch({ type: 'INIT_LOAD_COMPLETE', payload: true });
  };
}

export function showBasePrice(bool) {
  return (dispatch) => {
    dispatch({ type: 'SHOW_HIDE_BASE_PRICE', payload: bool });
  };
}
