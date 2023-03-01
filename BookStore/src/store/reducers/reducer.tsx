import { ADD_BOOK_TO_CART, ADD_MAGAZINE_TO_CART, REMOVE_BOOK_FROM_CART, REMOVE_MAGAZINE_FROM_CART } from "../actionTypes";

const initialState: any[] = []

const cartBooksReducer = (state = initialState, action: { type: any; payload: { id: any } }) => {
  
  switch(action.type){
    case ADD_BOOK_TO_CART:
      return [...state, action.payload ]
    case REMOVE_BOOK_FROM_CART:
      return state.filter( cartItem => cartItem.id !== action.payload.id )
  }
  return state
}
const cartMagazineReducer = (state = initialState, action: { type: any; payload: { id: any } }) => {
  
  switch(action.type){
    case ADD_MAGAZINE_TO_CART:
      return [...state, action.payload ]
    case REMOVE_MAGAZINE_FROM_CART:
      return state.filter( cartItem => cartItem.id !== action.payload.id )
  }
  return state
}

export {cartBooksReducer, cartMagazineReducer}