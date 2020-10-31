export const masterLokasiReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true }
        case 'refresh':
            return { ...state, refreshing: true }
        case 'setMasterLokasi':
            return { ...state, masterLokasi: action.data, isLoading: false, refreshing: false }

        default:
            return state
    }
}