import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Announcement from '../components/Announcement'
import MessageSuccess from '../components/MessageSuccess'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import '../../src/notisfied.css'

OrderScreen.propTypes = {}

function OrderScreen({ match }) {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

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
    dispatch(getOrderDetails(orderId))
  }, [])

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

              <p className='mb-1'>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country},
              </p>

              {order.isDelivered ? (
                <Announcement variant='success'>
                  Delivered on {order.DeliveredAt}
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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
