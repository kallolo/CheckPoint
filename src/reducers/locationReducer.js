export const locationReducer = (state, action) =>{
    switch (action.type) {
        case 'loading':
            return {...state, isLoading : true}
        case 'setLocationStart':
            return {...state, isLoading : false, locationStart : action.data}
        case 'setLocationCurrent':
            return {...state, isLoading : false, locationCurrent : action.data}
        case 'setJarak':
            return {...state, isLoading : false, jarak : action.data}
        case 'setRadius':
                return {...state, isLoading : false, radius : action.data}
        case 'stopUpdateLocation':
            return {...state, isLoading : false, locationCurrent : ""}
        case 'clearLocationStart':
                return {...state, isLoading : false, locationStart : ""}
        default:
            return state
    }
}