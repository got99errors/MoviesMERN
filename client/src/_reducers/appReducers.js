const initialState = {authenticated: false};

const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'loginSuccess':
            return {...state, authenticated: true}
    }
}

export default mainReducer;