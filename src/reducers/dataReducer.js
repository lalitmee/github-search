const dataReducer = (state = [{ isFetching: true }], action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return [...state, { data: action.payload.data, isFetching: false }];
    case 'REQUEST_DATA':
      return [...state, { isFetching: true }];
    default:
      return state;
  }
};

export default dataReducer;
