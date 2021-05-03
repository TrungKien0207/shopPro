import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers.js'
import {
  categoriesListReducer,
  categoriesListReducerAdm,
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryUpdateReducer,
} from './reducers/categoriesReducers.js'
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
  orderUpdateByMemberReducer,
  orderUpdateReducer,
} from './reducers/orderReducers.js'
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productFilterPriceReducer,
  productFilterReducer,
  productListReducer,
  productOfCategoryReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from './reducers/productReducers'
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  supplierListReducer,
  supplierListReducerAdm,
  supplierCreateReducer,
  supplierDeleteReducer,
  supplierDetailsReducer,
  supplierUpdateReducer,
} from './reducers/supplierReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productOfCategory: productOfCategoryReducer,
  productFilter: productFilterReducer,
  productFilterPrice: productFilterPriceReducer,

  cart: cartReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderUpdate: orderUpdateReducer,
  orderUpdateByMember: orderUpdateByMemberReducer,

  categoriesList: categoriesListReducer,
  categoriesListAdm: categoriesListReducerAdm,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,

  supplierList: supplierListReducer,
  supplierListAdm: supplierListReducerAdm,
  supplierDetails: supplierDetailsReducer,
  supplierUpdate: supplierUpdateReducer,
  supplierCreate: supplierCreateReducer,
  supplierDelete: supplierDeleteReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
