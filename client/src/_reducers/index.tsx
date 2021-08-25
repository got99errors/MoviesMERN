import {combineReducers} from 'redux'
import {authReducer} from './authReducer'
import {usersReducer} from './usersReducer'
import {moviesReducer} from './moviesReducer'
import {membersReducer} from './membersReducer'
import {menuReducer} from './menuReducer'

const rootReducer = combineReducers({
    authReducer,
    usersReducer,
    moviesReducer,
    membersReducer,
    menuReducer
});

export default rootReducer;
// export type RootState = ReturnType<typeof rootReducer>;