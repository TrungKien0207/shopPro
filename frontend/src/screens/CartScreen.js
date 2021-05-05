import Buttonn from '@material-ui/core/Button'
import ButtonGroupp from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useEffect } from 'react'
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions.js'
import { getUserDetails } from '../actions/userActions.js'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'

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

function format(n) {
  return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'
}

export const CartScreen = ({ match, location, history }) => {
  const classes = useStyles()
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  // console.log(cartItems.product)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty, userInfo])

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
    <>
      <Header />
      {/* <Link className='btn btn-light my-3 rounded-pill' to='/'>
        <i class='fas fa-arrow-left pr-2'></i>
        Go back
      </Link> */}

      <Row className='m-4' style={{ height: '100vh' }}>
        <Col md={8} className='p-0 pr-4 mt-3 text-uppercase'>
          {cartItems.length === 0 ? (
            // <Announcement variant='danger'>
            <>
              {/* <Row>
                <Col className='mb-2'> */}
              <div className='mb-1'>
                <Link to='/'>
                  <Button className='text-uppercase btn_color rounded-pill'>
                    Mua hàng
                  </Button>
                </Link>
              </div>
              {/* </Col>
                <Col md={12}> */}
              <div>
                <Image className=' p-5' src='/images/cart_empty.png' fluid />
              </div>
              {/* </Col>
              </Row> */}
            </>
          ) : (
            // </Announcement>
            <ListGroup variant='flush'>
              <h3>Giỏ hàng</h3>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.product}
                  className='border-0 mt-1 shadow card_color'
                  rounded
                >
                  <h6>
                    {item.brand} <i class='fas fa-angle-right'></i>
                  </h6>
                  <Row>
                    <Col md={2}>
                      <Link
                        to={`/product/${item.product}`}
                        className='text-decoration-none  product-card-green'
                      >
                        <Image src={item.image} alt={item.name} fluid />
                      </Link>
                    </Col>

                    <Col
                      md={4}
                      className='text-lowercase text-capitalize d-flex align-items-center'
                    >
                      <Link
                        to={`/product/${item.product}`}
                        className='text-decoration-none'
                      >
                        <p className='mb-0' style={{ color: '#343a40' }}>
                          {item.name}
                        </p>
                      </Link>
                    </Col>

                    <Col
                      md={3}
                      className='text-lowercase d-flex align-items-center'
                    >
                      <h4 className='text-lowercase'>{format(item.price)}</h4>
                    </Col>

                    <Col md={2} className='d-flex align-items-center'>
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

                    <Col md={1} className='d-flex align-items-center'>
                      <Button
                        type='button'
                        className='p-1 rounded'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i
                          style={{ fontSize: '1.2rem' }}
                          class='far fa-trash-alt'
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4} className='p-0'>
          <Card
            className='border-0 shadow mt-4 card_color p-3'
            style={{ zIndex: '1' }}
          >
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <h5 className='title-bill text-capitalize'>Số lượng: </h5>
                  </Col>
                  <Col md={6}>
                    <h5 className='title-bill-value text-lowercase pl-1'>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)} sản
                      phẩm
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <h5 className='title-bill text-capitalize'>Giá: </h5>
                  </Col>
                  <Col md={6}>
                    <h5 className='title-bill-value text-lowercase pl-1'>
                      {format(
                        cartItems.reduce(
                          (acc, item) => acc + item.qty * item.price,
                          0
                        )
                      )}
                    </h5>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card className='mt-3 border-0'>
            <Button
              type='button'
              className='btn-block btn_color rounded-pill text-uppercase p-3 text-light'
              disabled={cartItems === 0}
              onClick={checkoutHandler}
              size='sm'
            >
              <h5 className='text-light m-0'>Đặt hàng</h5>
            </Button>
          </Card>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default CartScreen
