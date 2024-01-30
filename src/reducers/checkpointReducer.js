export const checkpointReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {...state, isLoading: true};
    case 'stop-loading':
      return {...state, isLoading: false};
    case 'setListCheckpoint':
      return {...state, listCheckpoint: action.data, isLoading: false};
    case 'setDetailCheckpoint':
      return {...state, detailCheckpoint: action.data, isLoading: false};
    default:
      return state;
  }
};
