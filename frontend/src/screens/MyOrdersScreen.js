import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { listMyOrders } from '../actions/orderActions'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Announcement from '../components/Announcement'
import Loader from '../components/Loader'
import '../toast.css'
import { format, utcToZonedTime } from 'date-fns-tz'

function formatMoney(n, currency) {
  return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

const MyOrdersScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push()
    } else {
      // dispatch(getUserDetails('profile'))
      dispatch(listMyOrders())
    }
  }, [dispatch, history, userInfo, user])
  return (
    <>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Announcement variant='danger'>{errorOrders}</Announcement>
      ) : (
        <>
          <h3 className='text-center'>Đơn hàng của tôi</h3>
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm align-items-center  text-center rounded shadow bg-light '
          >
            <thead>
              <tr>
                <th style={{ fontSize: '0.85rem' }}>TÊN SẢN PHẨM</th>
                {/* <th style={{ fontSize: '0.85rem' }}>HÌNH ẢNH</th> */}
                <th style={{ fontSize: '0.85rem' }}>NGÀY ĐẶT</th>
                <th style={{ fontSize: '0.85rem' }}>TỔNG CỘNG</th>
                <th style={{ fontSize: '0.85rem' }}>ĐÃ THANH TOÁN</th>
                <th style={{ fontSize: '0.85rem' }}>TRẠNG THÁI</th>
                <th style={{ fontSize: '0.85rem' }}>THÔNG TIN</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {order.orderItems.map((item, index) => (
                      <Row>
                        <Col md={12}>
                          <td key={index} className='border-0 pb-1 pt-3'>
                            {item.name}
                          </td>
                        </Col>
                      </Row>
                    ))}
                  </td>
                  {/* <td style={{ width: '5rem', height: '5rem' }} className='p-0'>
                    {order.orderItems.map((item, index) => (
                      <Row>
                        <Col md={12} className='d-flex align-items-center'>
                          <td key={index} className='p-1 border-0'>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                              className='border border-grey'
                            />
                          </td>
                        </Col>
                      </Row>
                    ))}
                  </td> */}
                  <td>
                    <div>
                      <p>
                        {format(
                          new utcToZonedTime(
                            order.createdAt,
                            'Asia/Ho_Chi_Minh'
                          ),
                          'HH:mm:ss - dd/MM/yyyy',
                          { timeZone: 'Asia/Ho_Chi_Minh' }
                        )}
                      </p>
                    </div>
                  </td>
                  <td>{formatMoney(order.totalPrice, 'đ')}</td>
                  <td>
                    {order.paymentMethod === 'Thanh toán bằng tiền mặt' &&
                    order.isDelivered ? (
                      <strong className='mb-0'>
                        {format(
                          new utcToZonedTime(
                            order.deliveredAt,
                            'Asia/Ho_Chi_Minh'
                          ),
                          'HH:mm:ss - dd/MM/yyyy',
                          { timeZone: 'Asia/Ho_Chi_Minh' }
                        )}
                      </strong>
                    ) : order.paymentMethod === 'Thanh toán bằng PayPal' &&
                      order.isPaid ? (
                      <strong className='mb-0'>
                        {format(
                          new utcToZonedTime(order.paidAt, 'Asia/Ho_Chi_Minh'),
                          'HH:mm:ss - dd/MM/yyyy',
                          { timeZone: 'Asia/Ho_Chi_Minh' }
                        )}
                      </strong>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>

                  <td>{order.orderStatus}</td>
                  <td className='p-1 pt-2'>
                    <LinkContainer to={`/order/${order._id}`}>
                      <div>
                        <Button
                          variant='outline-light'
                          className='text-uppercase p-2 pl-3 pr-3 btn_color_details rounded-pill'
                        >
                          Chi tiết
                        </Button>
                      </div>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default MyOrdersScreen
