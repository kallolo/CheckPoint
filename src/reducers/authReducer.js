export const authReducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true }
        case 'loginBerhasil':
            return { ...state, isLoading: false, pesan: action.data.pesan, isAuthenticated: action.data.status, token: action.data.token, username: action.data.username }
        case 'loginGagal':
            return { ...state, isLoading: false, pesan: action.data.pesan, isAuthenticated: action.data.status }
        case 'lihatPassword':
            return { ...state, icon: state.icon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye', SecurePassword: !state.SecurePassword }
        case 'logout':
            return { ...state, isLoading: false, pesan: action.data.pesan, isAuthenticated: action.data.status, token: action.data.token, username: '' }
        default:
            return state
    }
}