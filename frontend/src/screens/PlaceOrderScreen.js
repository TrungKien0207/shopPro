import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'
import Announcement from '../components/Announcement'
import Message from '../components/Message'
import Step from '../components/Step'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import {
   ORDER_CREATE_RESET,
   ORDER_DETAIL_RESET,
} from '../constants/orderConstants'

PlaceOrderScreen.propTypes = {}

let formatPhoneNumber = (str) => {
   //Filter only numbers from the input
   let cleaned = ('' + str).replace(/\D/g, '')

   //Check if the input is of correct length
   let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

   if (match) {
      return '(' + match[1] + ') ' + match[2] + ' ' + match[3]
   }

   return null
}

function format(n, currency) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

function PlaceOrderScreen({ history }) {
   const dispatch = useDispatch()

   const cart = useSelector((state) => state.cart)

   // Calculate prices
   cart.itemsPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
   )

   const addDecimals = (num) => {
      return Math.round(num)
   }

   if (cart.shippingAddress.thanhPho === 'Thành phố Hà Nội') {
      cart.shippingPrice = 25000
   } else if (cart.shippingAddress.thanhPho === 'Thành phố Hồ Chí Minh') {
      cart.shippingPrice = 15000
   } else {
      cart.shippingPrice = 35000
   }

   // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
   cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
   cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)

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
         dispatch({ type: USER_DETAILS_RESET })
         dispatch({ type: ORDER_CREATE_RESET })

         cart.cartItems.map((item) => dispatch(removeFromCart(item.product)))
      }
      window.scrollTo(0, 0)
   }, [history, success])

   return (
      <>
         <Header />
         <Row className='m-4'>
            <Col md={8} className='mt-2'>
               <Step step1 step2 step3 step4 />
               <ListGroup
                  variant='flush'
                  className='shadow mt-3 card_color p-1 border-order'
               >
                  <ListGroup.Item className='pt-3'>
                     <h4 className='text-uppercase'>Thông tin giao hàng</h4>
                     <p className='mb-1 ml-2' style={{ fontSize: '0.9rem' }}>
                        <strong>Địa chỉ: </strong>
                        {cart.shippingAddress.diaChi} {' - '}{' '}
                        {cart.shippingAddress.xa} {' - '}
                        {cart.shippingAddress.huyen} {' - '}
                        {cart.shippingAddress.thanhPho}.
                     </p>
                     <p className='mb-2 ml-2' style={{ fontSize: '0.9rem' }}>
                        <strong>Số điện thoại: </strong>
                        {formatPhoneNumber(cart.shippingAddress.numberPhone)}
                     </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h4 className='text-uppercase mt-2'>
                        Phương thức thanh toán
                     </h4>
                     <div
                        className='d-flex mb-2 ml-2'
                        style={{ fontSize: '0.9rem' }}
                     >
                        <strong className='pr-1'>Phương Thức: </strong>
                        {cart.paymentMethod ? (
                           cart.paymentMethod
                        ) : (
                           <strong className='text-danger'>
                              Chưa chọn phương thức thanh toán
                           </strong>
                        )}
                     </div>
                  </ListGroup.Item>

                  <ListGroup.Item>
                     <h4 className='text-uppercase mt-2'>Giỏ hàng</h4>
                     {cart.cartItems.length === 0 ? (
                        <Message>Giỏ hàng của bạn trống</Message>
                     ) : (
                        <ListGroup variant='flush'>
                           {cart.cartItems.map((item, index) => (
                              <ListGroup.Item key={index}>
                                 <Row>
                                    <Col md={2}>
                                       <Image
                                          src={item.images[0].url}
                                          alt={item.name}
                                          fluid
                                          rounded
                                       />
                                    </Col>

                                    <Col
                                       md={5}
                                       className='d-flex align-items-center'
                                    >
                                       <Link
                                          to={`/product/${item.product}`}
                                          className='link-product'
                                       >
                                          {item.name}
                                       </Link>
                                    </Col>

                                    <Col
                                       md={5}
                                       className='d-flex align-items-center'
                                    >
                                       <b style={{ fontSize: '1rem' }}>
                                          {item.qty} x {format(item.price, 'đ')}
                                          {' = '}
                                          {format(item.qty * item.price, 'đ')}
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
               <Card
                  className='shadow mt-2 border-0 card_color p-1 border-order'
                  style={{ zIndex: '1' }}
               >
                  <ListGroup variant='flush' className='card_color'>
                     <ListGroup.Item>
                        <h4 className='text-uppercase text-center'>
                           Chi tiết hoá đơn
                        </h4>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col md={8}>Tổng tiền sản phẩm</Col>
                           <Col md={4}>
                              <strong>{format(cart.itemsPrice, 'đ')}</strong>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col md={8}>Phí vận chuyển</Col>
                           <Col m={4}>
                              <strong>{format(cart.shippingPrice, 'đ')}</strong>
                           </Col>
                        </Row>
                     </ListGroup.Item>

                     <ListGroup.Item>
                        <Row>
                           <Col md={8}>
                              <strong>Tổng cộng (bao gồm VAT):</strong>
                           </Col>
                           <Col md={4}>
                              <strong>{format(cart.totalPrice, 'đ')}</strong>
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
                           variant='outline-light'
                           className='btn-block text-uppercase btn-apply btn_color_created pt-3 rounded-pill'
                           disabled={cart.cartItems === 0}
                           onClick={placeOrderHandler}
                        >
                           <h5>Đặt hàng</h5>
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
         <Footer />
      </>
   )
}

export default PlaceOrderScreen
