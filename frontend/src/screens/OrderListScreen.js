import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import '../../src/notisfied.css'
import { listOrders } from '../actions/orderActions'
import Announcement from '../components/Announcement'
import Loader from '../components/Loader'

function OrderListScreen({ history }) {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h2>Orders List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Announcement variant='danger'>{error}</Announcement>
      ) : (
        <Table striped bordered hover response className='table-sm text-center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>
                  {order.createdAt.substring(11, 19)} {' : '}
                  {order.createdAt.substring(0, 10)}
                </td>
                <td>${order.totalPrice}</td>
                <td style={{color: '#fd7e14' , fontWeight: 'bold'}}>
                  {order.isPaid ? (
                    order.paidAt.substring(11, 19) +
                    ' : ' +
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td style={{color: 'green', fontWeight: 'bold'}}>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(11, 19) +
                    ' : ' +
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/order/${order._id}/edit`}>
                    <Button variant='dark' className='btn-sm btn-unique'>
                      DETAILS
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
