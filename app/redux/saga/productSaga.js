import { put, takeLatest } from 'redux-saga/effects'
import { GET_PRODUCTS, GET_PRODUCTS_LIST, SET_PRODUCTS, SET_PRODUCTS_LIST } from '../productAction'
import RequestMake from '../../utils/RequestMake'
import { PRODUCTS_BY_CATEGORY, PRODUCTS_LIST } from '../../utils/ApiList'
import firestore from '@react-native-firebase/firestore';

const getProducts = async () => {
  const product = await firestore().collection('Products').get();
  console.log(product.docs);
  console.log(product.size);
  const value = product.docs.map(doc => {
    return {
      rid: doc.id,
      ...doc.data()
    }
  })
  console.log(value);
  return value;

}
export function* workerGetProducts(action) {

  if (action) {
    const category = action.payload
    // const URL=`${PRODUCTS_BY_CATEGORY}/${category}`
    // console.log({URL});
    // getProducts().then(res => console.log(res))
    const data = yield getProducts();




    // const result = yield RequestMake(URL)    
    yield put({ type: SET_PRODUCTS, payload: data })
  }
}
export function* watcherGetProducts() {
  yield takeLatest(GET_PRODUCTS, workerGetProducts)
}


export function* workerGetProductsList(action) {
  if (action) {
    const category = action.payload
    const URL = `${PRODUCTS_LIST}`
    // console.log({URL});
    // const result = yield RequestMake(URL)    

    const data = yield getProducts();
    console.log(data);
    // console.log({result});
    yield put({ type: SET_PRODUCTS_LIST, payload: data })
  }
}
export function* watcherGetProductsList() {
  yield takeLatest(GET_PRODUCTS_LIST, workerGetProductsList)
}