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

  const submitHandler = (e) => {
    e.preventDefault()
    error &&
      toast.error(
        <div>
          <ErrorOutlineIcon className='pr-1' fontSize='large' /> {error}
        </div>,
        {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )

    if (password !== confirmPassword) {
      toast.error(
        <div>
          <ErrorOutlineIcon className='pr-1' fontSize='large' /> Password is not
          match
        </div>,
        {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    } else {
      dispatch(updateUserProfile({ id: user._id, email, name, password }))
      toast.success(
        <div>
          <CheckCircleOutlineIcon className='pr-1' fontSize='large' />
          Profile Updated
        </div>,
        {
          className: 'Toastify__toast--success',
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push()
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
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
          <h5>Đơn hàng của tôi</h5>
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm align-items-center text-center rounded shadow bg-light '
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
                        {' '}
                        {order.createdAt.substring(11, 19)}
                        {' - '}
                        {order.createdAt.substring(0, 10)}
                      </p>
                    </div>
                  </td>
                  <td>{order.totalPrice}đ</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(11, 19) +
                      ' : ' +
                      order.paidAt.substring(0, 10)
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
