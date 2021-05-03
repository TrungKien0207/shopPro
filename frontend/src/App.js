import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { BackTop } from 'antd'
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getUserDetails } from './actions/userActions'
import Footer from './components/Footer'
import Header from './components/Header'
import CartScreen from './screens/CartScreen.js'
import CategoriesListScreen from './screens/CategoriesListScreen'
import CategoryEditScreen from './screens/CategoryEditScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import MyOrdersScreen from './screens/MyOrdersScreen'
import OrderEditScreen from './screens/OrderEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderScreen from './screens/OrderScreen.js'
import { PaymentScreen } from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductOfCategoryScreen from './screens/ProductOfCategoryScreen'
import ProductScreen from './screens/ProductScreen.js'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen.js'
import { ShippingScreen } from './screens/ShippingScreen'
import SupplierListScreen from './screens/SupplierListScreen'
import SupplierEditScreen from './screens/SupplierEditScreen'
import UserEditScreen from './screens/UserEditScreen'
import UserListScreen from './screens/UserListScreen'
import Admin from './screens/admin/src/layouts/Admin'

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Quicksand", "Roboto", "Arial", sans-serif`,
  },
})

const App = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails(userInfo._id))
    }
  }, [dispatch, userInfo])

  return (
    <>
      <BackTop />
      <ThemeProvider theme={THEME}>
        <Router>
          <Header />
          <main className='mb-4'>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/search/:keyword' component={HomeScreen} exact />

            <Route
              path='/admin/productlist'
              component={ProductListScreen}
              exact
            />
            <Route path='/admin/k' component={Admin} exact />

            <div className='ml-5 mr-5 mt-3'>
              <Route path='/profile' component={ProfileScreen} exact />
              <Route
                path='/admin/categorieslist'
                component={CategoriesListScreen}
                exact
              />

              <Route
                path='/admin/supplierlist'
                component={SupplierListScreen}
                exact
              />

              <Route
                path='/admin/supplier/:id/edit'
                component={SupplierEditScreen}
                exact
              />

              <Route path='/cart/:id?' component={CartScreen} exact />

              <Route
                path='/admin/orderlist'
                component={OrderListScreen}
                exact
              />

              <Route
                path='/admin/order/:id/edit'
                component={OrderEditScreen}
                exact
              />

              <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
                exact
              />

              <Route
                path='/admin/user/:id/edit'
                component={UserEditScreen}
                exact
              />

              <Route
                path='/product/:id/category'
                component={ProductOfCategoryScreen}
                exact
              />

              <Route
                path='/admin/product/create'
                component={ProductCreateScreen}
                exact
              />

              <Route path='/product/:id' component={ProductScreen} exact />
              <Route path='/order/:id' component={OrderScreen} exact />
              <Route path='/myorders' component={MyOrdersScreen} exact />
              <Route path='/register' component={RegisterScreen} exact />
              <Route path='/shipping' component={ShippingScreen} exact />
              <Route path='/login' component={LoginScreen} exact />
              <Route path='/placeorder' component={PlaceOrderScreen} exact />
            </div>
            <Container>
              <Route
                path='/admin/category/:id/edit'
                component={CategoryEditScreen}
                exact
              />
              <Route path='/payment' component={PaymentScreen} exact />

              <Route path='/admin/userlist' component={UserListScreen} exact />

              <Route
                path='/admin/productlist/:pageNumber'
                component={ProductListScreen}
                exact
              />

              <Route path='/page/:pageNumber' component={HomeScreen} exact />
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={HomeScreen}
                exact
              />
            </Container>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
