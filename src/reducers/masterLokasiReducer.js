export const masterLokasiReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {...state, isLoading: true};
    case 'stop-loading':
      return {...state, isLoading: false};
    case 'refresh':
      return {...state, refreshing: true};
    case 'stop-refresh':
      return {...state, refreshing: false};
    case 'setMasterLokasi':
      return {
        ...state,
        masterLokasi: action.data,
        isLoading: false,
        refreshing: false,
      };
    case 'setDetailMasterLokasi':
      return {
        ...state,
        detailLokasi: action.data,
        isLoading: false,
        refreshing: false,
      };
    case 'setPertanyaan':
      return {
        ...state,
        detailPertanyaan: action.data,
        isLoading: false,
        refreshing: false,
      };
    case 'handleInputJawaban':
      return {...state, detailPertanyaan: action.data};
    default:
      return state;
  }
};
