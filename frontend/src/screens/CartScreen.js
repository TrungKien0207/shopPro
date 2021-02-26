import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Announcement from '../components/Announcement'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  Col,
  Form,
  Alert,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions.js'

export const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  const test = (e) => {
    const value = e.target.value
    if (parseInt(value) === 0) {
      alert('sai')
    }
    console.log(value)
  }

  return (
    <Col>
      <Link className='btn btn-light my-3' to='/'>
        <i class='fas fa-arrow-left pr-2'></i>
        Go back
      </Link>
      <h3>Shopping Cart</h3>
      <Row>
        <Col md={9} className='p-0 pr-4 mt-2 text-center text-uppercase'>
          {cartItems.length === 0 ? (
            <Announcement variant='warning'>
              <b className='text-light fs-1'>Your cart is empty </b>
              <Link to='/'>
                <Button variant='light' className='text-uppercase'>
                  Shop now
                </Button>
              </Link>
            </Announcement>
          ) : (
            <ListGroup variant='flush' className=''>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.product}
                  className='border-0 mt-2 shadow '
                  rounded
                >
                  <h6>
                    NSX <i class='fas fa-angle-right'></i>
                  </h6>
                  <Row>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        className='text-decoration-none product-card-green'
                      >
                        <Image src={item.image} alt={item.name} fluid />
                      </Link>
                    </Col>

                    <Col md={4}>
                      <Link
                        to={`/product/${item.product}`}
                        className='text-decoration-none'
                      >
                        <p style={{ color: '#343a40' }}>{item.name}</p>
                      </Link>
                    </Col>

                    <Col md={2} className='pt-2'>
                      <h6>${item.price}</h6>
                    </Col>

                    <Col md={2}>
                      <Form.Control
                        className='text-center'
                        type='number'
                        size='sm'
                        min='0'
                        defaultValue='1'
                        onChange={(e) =>
                          Number(e.target.value) !== 0
                            ? dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            : () => removeFromCartHandler(item.product)
                        }
                      ></Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={3} className='p-0'>
          <Card className='border-0 shadow mt-2'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='d-flex justify-content-around '>
                <div>
                  <p className='title-bill'>Subtotal: </p>
                  <p className='title-bill'>Price: </p>
                </div>
                <div>
                  <h6 className='title-bill-value'>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
                  </h6>
                  <h6 className='title-bill-value'>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h6>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card className='mt-3 border-0 btn-proceed'>
            <Button
              type='button'
              className='btn-block btn-danger text-uppercase p-2'
              disabled={cartItems === 0}
              onClick={checkoutHandler}
              size='sm'
              style={{ fontFamily: 'Montserrat', fontSize: '0.78em' }}
            >
              Proceed To Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </Col>
  )
}

export default CartScreen
