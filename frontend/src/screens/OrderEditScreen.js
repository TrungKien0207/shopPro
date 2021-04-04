import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { Col, Image, ListGroup, Row, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, updateOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_UPDATE_RESET } from '../constants/orderConstants'
import MessageSuccess from '../components/MessageSuccess'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 560,
  },
}))

const OrderEditScreen = ({ match, history }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const dispatch = useDispatch()

  const orderId = match.params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderUpdate = useSelector((state) => state.orderUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = orderUpdate

  const stateOrder = ['Chờ xác nhận', 'Đang vận chuyển', 'Đã giao hàng', 'Huỷ']
  const [orderStatus, setOrderStatus] = useState('Chờ xác nhận')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateOrder({ _id: orderId, orderStatus }))
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ORDER_UPDATE_RESET })
    } else {
      if (orderStatus || order._id !== orderId) {
        dispatch(getOrderDetails(orderId))
      } else {
        setOrderStatus(order.orderStatus)
      }
    }
  }, [dispatch, orderId, successUpdate])

  return (
    <>
      {loadingUpdate && (
        <MessageSuccess variant='Chỉnh sửa thành công'></MessageSuccess>
      )}
      {errorUpdate && <Message>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={submitHandler}>
          <ListGroup
            variant='flush'
            className='shadow p-3 mt-3 card_color'
            style={{ border: '0.4rem dashed #ffc1b6', borderRadius: '1rem' }}
          >
            <Row>
              <Col md={6}>
                <h4 className='pl-2'>CHI TIẾT ĐƠN HÀNG</h4>
              </Col>
              <Col md={6}>{order.orderStatus}</Col>
            </Row>
            <ListGroup.Item className='border-0'>
              <Row>
                <Col md={6}>
                  <p className='text-start'>
                    Mã đơn hàng: <strong>{order._id}</strong>
                  </p>
                  <p className='text-start'>
                    Tổng tiền: <strong>{order.totalPrice}đ</strong>
                  </p>
                </Col>
                <Col md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      id='demo-controlled-open-select-label'
                      style={{ fontSize: '1.2rem' }}
                    >
                      Trạng thái đơn hàng
                    </InputLabel>
                    <Select
                      labelId='demo-controlled-open-select-label'
                      id='demo-controlled-open-select'
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={orderStatus}
                      onChange={(e) => setOrderStatus(e.target.value)}
                      className='text-danger text-center text-uppercase'
                    >
                      {stateOrder.map((t) => (
                        <MenuItem className='justify-content-center' value={t}>
                          {t}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
              <Row>
                <Col md={6} className='border-0'>
                  <Card
                    className='rounded card_color'
                    style={{ height: '11rem', backgroundColor: '#F8F8F8' }}
                  >
                    <CardContent>
                      <h5 className='border-bottom border-info text-info pb-1'>
                        Thông tin người nhận
                      </h5>
                      <div>
                        <Row className='m-0'>
                          <Col md={4}>
                            <p style={{ color: 'grey' }} className='mb-1'>
                              Địa chỉ:
                            </p>
                          </Col>
                          <Col md={8}>
                            <strong>{order.user.name}</strong>
                          </Col>
                        </Row>
                        <Row className='m-0'>
                          <Col md={4}>
                            <p style={{ color: 'grey' }} className='mb-1'>
                              Tên khách hàng:
                            </p>
                          </Col>
                          <Col md={8}>
                            <p className='mb-1'>
                              {order.shippingAddress.diaChi}
                              {' - '}
                              {order.shippingAddress.xa}
                              {' - '}
                              {order.shippingAddress.huyen}
                              {' - '}
                              {order.shippingAddress.thanhPho}.
                            </p>
                          </Col>
                        </Row>
                        <Row className='m-0'>
                          <Col md={4}>
                            <p style={{ color: 'grey' }} className='mb-1'>
                              Email:
                            </p>
                          </Col>
                          <Col md={8}>
                            <p className='mb-1'>{order.user.email}</p>
                          </Col>
                        </Row>
                      </div>
                    </CardContent>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card
                    className='rounded card_color'
                    style={{ height: '11rem', backgroundColor: '#F8F8F8' }}
                  >
                    <CardContent>
                      <h5 className='border-bottom border-info text-info pb-1'>
                        Phương thức thanh toán
                      </h5>
                      <div>
                        <Row className='m-0'>
                          <Col md={5}>
                            <p style={{ color: 'grey' }} className='mb-1'>
                              Phương thức:
                            </p>
                          </Col>
                          <Col md={7} className='pt-1'>
                            <h6 className='mb-0'>{order.paymentMethod}</h6>
                          </Col>
                        </Row>
                        <Row className='m-0'>
                          <Col md={5}>
                            <p style={{ color: 'grey' }} className='mb-1'>
                              Thời gian thanh toán:
                            </p>
                          </Col>
                          <Col md={7}>
                            <p className='mb-1'>
                              {order.paidAt ? (
                                <strong className='mb-0'>{order.paidAt}</strong>
                              ) : (
                                <div className='d-flex'>
                                  <Image
                                    src='https://img.icons8.com/fluent/24/000000/only-cash.png'
                                    className='pr-1'
                                  />
                                  <strong className='text-danger mb-0'>
                                    Chưa thanh toán
                                  </strong>
                                </div>
                              )}
                            </p>
                          </Col>
                        </Row>
                        <Row className='m-0'>
                          <Col md={5}>
                            <p style={{ color: 'grey' }} className='mb-1'>
                              Thời gian nhận hàng:
                            </p>
                          </Col>
                          <Col md={7}>
                            {order.deliveredAt ? (
                              <strong className='mb-0'>
                                {order.deliveredAt}
                              </strong>
                            ) : (
                              <div className='d-flex'>
                                <Image
                                  src='https://img.icons8.com/fluent/24/000000/only-cash.png'
                                  className='pr-1'
                                />
                                <strong className='text-danger mb-0'>
                                  Chưa nhận hàng
                                </strong>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </CardContent>
                  </Card>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item className='border-0'>
              <h5
                className='pb-1'
                style={{ borderBottom: '0.04rem solid #ddd' }}
              >
                Chi tiết giỏ hàng
                <Image
                  src='https://img.icons8.com/fluent/28/000000/shopping-cart-loaded.png'
                  className='pl-2'
                />
              </h5>

              <div className='rounded mt-3'>
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className='p-3 card_color shadow border mb-1'
                    style={{ backgroundColor: '#F8F8F8' }}
                  >
                    <Row>
                      <Col md={1} className='img_container'>
                        <Image
                          className='img_color'
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>

                      <Col md={7} className='text-center'>
                        <Link
                          to={`/product/${item.product}`}
                          className='link-product fst-italic'
                        >
                          <p style={{ fontSize: '1.1rem' }} className='pt-3'>
                            {item.name}
                          </p>
                        </Link>
                      </Col>

                      <Col md={4} className='text-center'>
                        <p
                          style={{ fontSize: '1.1rem' }}
                          className='pt-3 fst-italic'
                        >
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </p>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className='border-0'>
              <div
                className='d-flex justify-content-end '
                style={{ borderTop: '0.04rem solid #ddd' }}
              >
                <Button
                  type='submit'
                  variant='outline-light rounded-pill mt-4 btn_color_pink'
                  size='normal'
                  style={{
                    width: '14rem',
                    fontSize: '1rem',
                    letterSpacing: '0.25rem',
                  }}
                >
                  DUYỆT
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Form>
      )}
    </>
  )
}

export default OrderEditScreen
