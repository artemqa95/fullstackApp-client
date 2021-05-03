const initialState = {
    menuOpened: 'home'
}

const handlers = {
    DEFAULT: state => state,
}

const menuReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state,action)
}

export default menuReducer