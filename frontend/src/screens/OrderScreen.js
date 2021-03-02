import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../src/notisfied.css'
import {
  deliverOrder,
  getOrderDetails,
  payOrder
} from '../actions/orderActions'
import Announcement from '../components/Announcement'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <h2>Order {order._id}</h2>
      <Row className='justify-content-center'>
        <Col md={7} className='ml-3 mr-3 pl-0 pr-0 mt-2'>
          <ListGroup variant='flush' className='shadow'>
            <ListGroup.Item>
              <h5 className='text-uppercase'>Shiping</h5>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a
                  className='link-product'
                  href={`mailto: ${order.user.email}`}
                >
                  {order.user.email}
                </a>
              </p>

              <p className='mb-3'>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country},
              </p>

              {order.isDelivered ? (
                <Announcement variant='success'>
                  Delivered on {order.deliveredAt}
                </Announcement>
              ) : (
                <Announcement variant='danger'>No Delivered</Announcement>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5 className='text-uppercase'>Payment Method</h5>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Announcement variant='success'>
                  Paid on {order.paidAt}
                </Announcement>
              ) : (
                <Announcement variant='danger'>No Paid</Announcement>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h5 className='text-uppercase'>Order Items</h5>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Link
                            to={`/product/${item.product}`}
                            className='link-product'
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Link>
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
          <Card className='shadow mt-2'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4 className='text-uppercase text-center'>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    <strong>${order.itemsPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    <strong>${order.shippingPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    <strong>${order.taxPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    <strong>${order.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
