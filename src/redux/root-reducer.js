import { combineReducers } from 'redux';
import {persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';


const persistConfig= {
  key:'root',
  storage,
  whitlelist:['user','cart']
}
const rootreducer= combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default persistReducer(persistConfig,rootreducer)

