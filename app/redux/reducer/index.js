import { combineReducers } from 'redux';
import cart from './cart';
import error from './error';
import products from './products';
import auth from './auth';
import wishList from './wishList';
import orders from './orderDetail'

export default combineReducers({
  error,
  cart,
  products,
  auth,
  wishList,
  orders
});
