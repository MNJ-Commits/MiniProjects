import { combineReducers } from 'redux'
import { cartBooksReducer, cartMagazineReducer } from './reducer'


const reducers = combineReducers({
    Books: cartBooksReducer,
    Magazines: cartMagazineReducer
})

export default reducers