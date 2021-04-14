import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
import ProductEditScreen from './screens/ProductEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductScreen from './screens/ProductScreen.js'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen.js'
import { ShippingScreen } from './screens/ShippingScreen'
import UserEditScreen from './screens/UserEditScreen'
import UserListScreen from './screens/UserListScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import ProductOfCategoryScreen from './screens/ProductOfCategoryScreen'

const THEME = createMuiTheme({
  typography: {
    fontFamily: `"Quicksand", "Roboto", "Arial", sans-serif`,
  },
})

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <Header />
        <main className='mb-5'>
          <Route path='/' component={HomeScreen} exact />

          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />

          <div className='ml-2 mr-2 mt-2'>
            <Route
              path='/admin/categorieslist'
              component={CategoriesListScreen}
              exact
            />

            <Route path='/admin/orderlist' component={OrderListScreen} exact />

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

            <Route path='/order/:id' component={OrderScreen} exact />
            <Route path='/myorders' component={MyOrdersScreen} exact />
          </div>
          <Container>
            <Route path='/product/:id' component={ProductScreen} exact />
            <Route path='/profile' component={ProfileScreen} exact />
            <Route path='/login' component={LoginScreen} exact />
            <Route path='/register' component={RegisterScreen} exact />
            <Route path='/shipping' component={ShippingScreen} exact />
            <Route
              path='/admin/category/:id/edit'
              component={CategoryEditScreen}
              exact
            />
            <Route path='/payment' component={PaymentScreen} exact />
            <Route path='/placeorder' component={PlaceOrderScreen} exact />
            <Route path='/cart/:id?' component={CartScreen} exact />
            <Route path='/admin/userlist' component={UserListScreen} exact />

            <Route
              path='/admin/productlist/:pageNumber'
              component={ProductListScreen}
              exact
            />

            <Route path='/search/:keyword' component={HomeScreen} exact />
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
  )
}

export default App
