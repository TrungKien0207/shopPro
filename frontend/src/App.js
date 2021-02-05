import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import CartScreen from './screens/CartScreen.js'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import { PaymentScreen } from './screens/PaymentScreen'
import ProductScreen from './screens/ProductScreen.js'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen.js'
import { ShippingScreen } from './screens/ShippingScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/register' component={RegisterScreen} exact />
          <Route path='/shipping' component={ShippingScreen} exact />
          <Route path='/payment' component={PaymentScreen} exact />
          <Route path='/cart/:id?' component={CartScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
