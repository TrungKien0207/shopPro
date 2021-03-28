import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import Announcement from '../components/Announcement'
import Message from '../components/Message'
import Step from '../components/Step'

PlaceOrderScreen.propTypes = {}

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  // Calculate prices
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price + item.qty,
    0
  )

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
  }, [history, success])

  return (
    <>
      <Row className='justify-content-center'>
        <Col md={7} className='ml-3 mr-3 pl-0 pr-0 mt-2'>
          <Step step1 step2 step3 step4 />
          <ListGroup
            variant='flush'
            className='shadow pt-3 mt-3 card_color pb-3'
          >
            <ListGroup.Item className='border-0'>
              <h5 className='text-uppercase'>Shiping</h5>
              <p className='mb-1'>
                <strong>Địa chỉ: </strong>
                {cart.shippingAddress.diaChi}, {cart.shippingAddress.xa},{' '}
                {cart.shippingAddress.huyen}, {cart.shippingAddress.thanhPho},
              </p>
            </ListGroup.Item>

            <ListGroup.Item className='border-0'>
              <h5 className='text-uppercase'>Payment Method</h5>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5 className='text-uppercase'>Order Items</h5>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            className='link-product'
                          >
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          <b>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </b>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className='shadow mt-2 border-0 card_color pt-3 pb-3'>
            <ListGroup variant='flush' className='card_color'>
              <ListGroup.Item>
                <h4 className='text-uppercase text-center'>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='pl-5 mr-5'>Items</Col>
                  <Col className='pl-5 pr-0'>
                    <strong>${cart.itemsPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='pl-5 mr-5'>Shipping</Col>
                  <Col className='pl-5 pr-0'>
                    <strong>${cart.shippingPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='pl-5 mr-5'>Tax</Col>
                  <Col className='pl-5 pr-0'>
                    <strong>${cart.taxPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='pl-5 mr-5'>Total</Col>
                  <Col className='pl-5 pr-0'>
                    <strong>${cart.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Announcement variant='danger'>
                    Vui lòng chọn phương thức thanh toán
                  </Announcement>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block  text-uppercase btn-apply btn_color rounded-pill '
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  <strong>Place Order</strong>
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
