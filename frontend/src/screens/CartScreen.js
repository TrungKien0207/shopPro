import Buttonn from '@material-ui/core/Button'
import ButtonGroupp from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions.js'
import Announcement from '../components/Announcement'
import Loader from '../components/Loader'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
    },

    '& .MuiInputBase-input': {
      padding: theme.spacing(2),
    },

    '& .MuiFilledInput-input': {
      padding: theme.spacing(2),
    },

    '& .MuiFilledInput-inputMarginDense': {
      padding: theme.spacing(1),
      textAlign: 'center',
    },
  },
}))

export const CartScreen = ({ match, location, history }) => {
  const classes = useStyles()
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  console.log(cartItems.product)

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

  // const test = (e) => {
  //   const value = e.target.value
  //   if (parseInt(value) === 0) {
  //     alert('sai')
  //   }
  //   console.log(value)
  // }

  return (
    <Col>
      <Link className='btn btn-light my-3' to='/'>
        <i class='fas fa-arrow-left pr-2'></i>
        Go back
      </Link>
      <h3>Shopping Cart</h3>
      <Row>
        <Col md={9} className='p-0 pr-4 mt-3 text-uppercase'>
          {cartItems.length === 0 ? (
            <Announcement variant='danger'>
              <b className='fs-1'>Your cart is empty </b>
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
                  className='border-0 mt-1 shadow rounded'
                  rounded
                >
                  <h6>
                    {item.brand} <i class='fas fa-angle-right'></i>
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
                      <h4>${item.price}</h4>
                    </Col>

                    <Col md={2} className='pt-2'>
                      <ButtonGroupp size='small' aria-label='small '>
                        <Buttonn
                          aria-label='reduce'
                          size='small'
                          color='secondary'
                          onClick={() =>
                            item.qty !== 0
                              ? dispatch(
                                  addToCart(
                                    item.product,
                                    Math.max(item.qty - 1, 1)
                                  )
                                )
                              : () => removeFromCartHandler(item.product)
                          }
                          variant='contained'
                        >
                          <RemoveIcon fontSize='small' />
                        </Buttonn>

                        {/* <Buttonn variant='contained'>{item.qty}</Buttonn> */}
                        <div>
                          <TextField
                            className={classes.root}
                            id='filled-size-small'
                            value={item.qty}
                            variant='filled'
                            size='small'
                            onChange={(e) =>
                              Number(e.target.value) !== 0
                                ? dispatch(
                                    addToCart(
                                      item.product,
                                      Number(e.target.value)
                                    )
                                  )
                                : dispatch(
                                    addToCart(
                                      item.product,
                                      Number((e.target.value = ''))
                                    )
                                  )
                            }
                          />
                        </div>
                        <Buttonn
                          aria-label='increase'
                          size='small'
                          onClick={() =>
                            dispatch(addToCart(item.product, item.qty + 1))
                          }
                          variant='contained'
                          color='secondary'
                        >
                          <AddIcon fontSize='small' />
                        </Buttonn>
                      </ButtonGroupp>
                    </Col>

                    <Col md={1}>
                      <Button
                        type='button'
                        className='pl-2 pr-2 rounded'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <Image src='https://img.icons8.com/fluent/28/000000/delete-forever.png' />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={3} className='p-0'>
          <Card className='border-0 shadow mt-4 rounded'>
            <ListGroup variant='flush'>
              <ListGroup.Item className='d-flex justify-content-around '>
                <div>
                  <h5 className='title-bill'>Subtotal: </h5>
                  <h5 className='title-bill'>Price: </h5>
                </div>
                <div>
                  <h5 className='title-bill-value'>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
                  </h5>
                  <h5 className='title-bill-value'>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h5>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card className='mt-3 border-0 btn-proceed'>
            <Button
              type='button'
              className='btn-block btn-danger text-uppercase p-3 text-light'
              disabled={cartItems === 0}
              onClick={checkoutHandler}
              size='sm'
              style={{
                fontFamily: 'Montserrat',
                fontSize: '0.78em',
                color: '#fff',
              }}
            >
              <h6 className='text-light m-0'>Proceed To Checkout</h6>
            </Button>
          </Card>
        </Col>
      </Row>
    </Col>
  )
}

export default CartScreen
