export const locationReducer = (state, action) =>{
    switch (action.type) {
        case 'loading':
            return {...state, isLoading : true}
        case 'setLocationStart':
            return {...state, isLoading : false, locationStart : action.data}
        case 'setLocationCurrent':
            return {...state, isLoading : false, locationCurrent : action.data}
        case 'resetState':
            return action.initialState
        default:
            return state
    }
}