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


    const products = [{
      id: 1,
      title: 'Perfume',
      price: '100',
      category: `${category}`,
      description: 'best Perfume for Men',
      image: 'https://static-01.daraz.pk/p/9479998380b91cac805f5953c291df75.jpg'
    }, {
      id: 2,
      title: 'Body Spray',
      price: '200',
      category: `${category}`,
      description: 'Best Body spray for Men',
      image: 'https://static-01.daraz.pk/p/9f3337af1fd449afdaead1dbd8246fd0.png'
    }, {
      id: 3,
      title: 'Blue Men Body Spray',
      price: '300',
      category: `${category}`,
      description: 'Best Body spray for Men',
      image: 'https://static-01.daraz.pk/p/e90dcc4c91fb264ab1872a0a7e5b7130.jpg'
    }]

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
    const products = [{
      id: 1,
      title: 'Perfume',
      price: '100',
      category: `${category}`,
      description: 'best Perfume for Men',
      image: 'https://static-01.daraz.pk/p/9479998380b91cac805f5953c291df75.jpg'
    }, {
      id: 2,
      title: 'Body Spray',
      price: '200',
      category: `${category}`,
      description: 'Best Body spray for Men',
      image: 'https://static-01.daraz.pk/p/9f3337af1fd449afdaead1dbd8246fd0.png'
    }, {
      id: 3,
      title: 'Blue Men Body Spray',
      price: '300',
      category: `${category}`,
      description: 'Best Body spray for Men',
      image: 'https://static-01.daraz.pk/p/e90dcc4c91fb264ab1872a0a7e5b7130.jpg'
    }]
    const data = yield getProducts();
    console.log(data);
    // console.log({result});
    yield put({ type: SET_PRODUCTS_LIST, payload: data })
  }
}
export function* watcherGetProductsList() {
  yield takeLatest(GET_PRODUCTS_LIST, workerGetProductsList)
}