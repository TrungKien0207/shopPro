import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Form,
  Row,
  Table,
  Image,
  ListGroup,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {
  register,
  login,
  getUserDetails,
  updateUserProfile,
} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorIcon from '@material-ui/icons/Error'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { useSnackbar } from 'notistack'
import '../toast.css'
import { listMyOrders } from '../actions/orderActions'
import Announcement from '../components/Announcement'
ProfileScreen.propTypes = {}

function ProfileScreen({ location, history }) {
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
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {/* {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>} */}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='success'>
            Update
          </Button>
          <ToastContainer />
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Order</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Announcement variant='danger'>{errorOrders}</Announcement>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm text-center'
          >
            <thead>
              <tr className='text-center'>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className='p-0 r'>
                    {order.orderItems.map((item, index) => (
                      <td key={index} className='border-0'>
                        {item.name}
                      </td>
                    ))}
                  </td>
                  <td style={{ width: '2rem', height: '2rem' }} className='p-0'>
                    {order.orderItems.map((item, index) => (
                      <td key={index} className='p-1 border-0'>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </td>
                    ))}
                  </td>
                  <td>
                    {order.createdAt.substring(11, 19)} <br/>{' '}
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(11, 19) +
                      ' : '  +
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant='info' className='text-uppercase'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
