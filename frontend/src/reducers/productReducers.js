import {
   PRODUCT_CREATE_FAIL,
   PRODUCT_CREATE_REQUEST,
   PRODUCT_CREATE_RESET,
   PRODUCT_CREATE_REVIEW_FAIL,
   PRODUCT_CREATE_REVIEW_REQUEST,
   PRODUCT_CREATE_REVIEW_RESET,
   PRODUCT_CREATE_REVIEW_SUCCESS,
   PRODUCT_CREATE_SUCCESS,
   PRODUCT_DELETE_FAIL,
   PRODUCT_DELETE_REQUEST,
   PRODUCT_DELETE_SUCCESS,
   PRODUCT_DETAILS_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_FILTER_FAIL,
   PRODUCT_FILTER_PRICE_FAIL,
   PRODUCT_FILTER_PRICE_REQUEST,
   PRODUCT_FILTER_PRICE_RESET,
   PRODUCT_FILTER_PRICE_SUCCESS,
   PRODUCT_FILTER_REQUEST,
   PRODUCT_FILTER_RESET,
   PRODUCT_FILTER_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_OF_CATEGORY_FAIL,
   PRODUCT_OF_CATEGORY_REQUEST,
   PRODUCT_OF_CATEGORY_SUCCESS,
   PRODUCT_TOP_FAIL,
   PRODUCT_TOP_REQUEST,
   PRODUCT_TOP_SUCCESS,
   PRODUCT_UPDATE_FAIL,
   PRODUCT_UPDATE_REQUEST,
   PRODUCT_UPDATE_RESET,
   PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
   switch (action.type) {
      case PRODUCT_LIST_REQUEST:
         return { loading: true, products: [] }
      case PRODUCT_LIST_SUCCESS:
         return {
            loading: false,
            products: action.payload.products,
            pages: action.payload.pages,
            page: action.payload.page,
         }
      case PRODUCT_LIST_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const productDetailsReducer = (
   state = { product: { reviews: [] } },
   action
) => {
   switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
         return { loading: true, ...state }
      case PRODUCT_DETAILS_SUCCESS:
         return { loading: false, product: action.payload }
      case PRODUCT_DETAILS_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const productOfCategoryReducer = (state = { products: [] }, action) => {
   switch (action.type) {
      case PRODUCT_OF_CATEGORY_REQUEST:
         return { loading: true, products: [] }
      case PRODUCT_OF_CATEGORY_SUCCESS:
         return {
            loading: false,
            products: action.payload,
            // pages: action.payload.pages,
            // page: action.payload.page,
         }
      case PRODUCT_OF_CATEGORY_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const productDeleteReducer = (state = {}, action) => {
   switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
         return { loading: true }
      case PRODUCT_DELETE_SUCCESS:
         return { loading: false, success: true }
      case PRODUCT_DELETE_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const productCreateReducer = (state = {}, action) => {
   switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
         return { loading: true }
      case PRODUCT_CREATE_SUCCESS:
         return { loading: false, success: true, product: action.payload }
      case PRODUCT_CREATE_FAIL:
         return { loading: false, error: action.payload }
      case PRODUCT_CREATE_RESET:
         return {}
      default:
         return state
   }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
   switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
         return { loading: true }
      case PRODUCT_UPDATE_SUCCESS:
         return { loading: false, success: true, product: action.payload }
      case PRODUCT_UPDATE_FAIL:
         return { loading: false, error: action.payload }
      case PRODUCT_UPDATE_RESET:
         return { product: {} }
      default:
         return state
   }
}

export const productReviewCreateReducer = (state = {}, action) => {
   switch (action.type) {
      case PRODUCT_CREATE_REVIEW_REQUEST:
         return { loading: true }
      case PRODUCT_CREATE_REVIEW_SUCCESS:
         return { loading: false, success: true }
      case PRODUCT_CREATE_REVIEW_FAIL:
         return { loading: false, error: action.payload }
      case PRODUCT_CREATE_REVIEW_RESET:
         return {}
      default:
         return state
   }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
   switch (action.type) {
      case PRODUCT_TOP_REQUEST:
         return { loading: true, products: [] }
      case PRODUCT_TOP_SUCCESS:
         return { loading: false, products: action.payload }
      case PRODUCT_TOP_FAIL:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const productFilterReducer = (state = { products: [] }, action) => {
   switch (action.type) {
      case PRODUCT_FILTER_REQUEST:
         return { loading: true }
      case PRODUCT_FILTER_SUCCESS:
         return { loading: false, success: true, product: action.payload }
      case PRODUCT_FILTER_FAIL:
         return { loading: false, error: action.payload }
      case PRODUCT_FILTER_RESET:
         return {}
      default:
         return state
   }
}

export const productFilterPriceReducer = (state = { products: [] }, action) => {
   switch (action.type) {
      case PRODUCT_FILTER_PRICE_REQUEST:
         return { loading: true }
      case PRODUCT_FILTER_PRICE_SUCCESS:
         return { loading: false, success: true, product: action.payload }
      case PRODUCT_FILTER_PRICE_FAIL:
         return { loading: false, error: action.payload }
      case PRODUCT_FILTER_PRICE_RESET:
         return {}
      default:
         return state
   }
}

// export const newProductReducer = (state = { product: {} }, action) => {
//    switch (action.type) {
//       case PRODUCT_CREATE_REQUEST:
//          return {
//             ...state,
//             loading: true,
//          }

//       case PRODUCT_CREATE_SUCCESS:
//          return {
//             loading: false,
//             success: action.payload.success,
//             product: action.payload.product,
//          }

//       case PRODUCT_CREATE_RESET:
//          return {}

//       case PRODUCT_CREATE_FAIL:
//          return {
//             ...state,
//             error: action.payload,
//          }

//       default:
//          return state
//    }
// }
