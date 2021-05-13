import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../actions/orderActions'
import { listProducts } from '../../actions/productActions'
import { listSupplierAdm } from '../../actions/supplierActions'
import Header from './components/Header'
import SideBar from './components/SideBar'

function format(n, currency) {
  return n?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

const AdminScreen = ({ history }) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const supplierListAdm = useSelector((state) => state.supplierListAdm)
  const { supplier } = supplierListAdm

  const orderList = useSelector((state) => state.orderList)
  const { orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let outOfStock = 0
  let productOut = []
  products.map((product) => {
    if (product.countInStock == 0) {
      productOut.push(product)
      outOfStock += 1
    }
  })

  console.log('orders', orders)

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (userInfo) {
      dispatch(listOrders())
      dispatch(listProducts())
      dispatch(listSupplierAdm())
    }
  }, [dispatch, history, userInfo])
  return (
    <>
      <Header />
      <Row style={{ backgroundColor: '#b68973' }}>
        <Col md={2} className='p-0'>
          <SideBar />
        </Col>
        <Col md={10} className='pl-0' style={{ backgroundColor: '#eabf9f' }}>
          <div className='mt-3'>
            <h2 className='text-center text-dark'>Thống Kê</h2>
            <div>
              <Row className='p-3 '>
                <Col md={3}>
                  <Card
                    border='success'
                    className='shadow card_color'
                    style={{ height: '16rem' }}
                  >
                    <Card.Body>
                      <Card.Title className='text-center'>
                        <h4>Tổng số đơn hàng</h4>
                      </Card.Title>
                      <Card.Subtitle className='mb-3 mt-4 text-center text-muted'>
                        Tổng số đơn hàng đã được đặt
                      </Card.Subtitle>
                      <Card.Title className='text-center'>
                        <h1 style={{ fontSize: '3rem' }}>
                          {orders && orders.length}
                        </h1>
                      </Card.Title>
                      <Card.Subtitle className='mb-2 text-center'>
                        <h5 className='text-muted'>Đơn hàng</h5>
                      </Card.Subtitle>
                      <Card.Link
                        href='/admin/orderlist'
                        className='d-flex justify-content-end'
                      >
                        <Button color='secondary'>
                          <strong className='text-capitalize'>
                            {' '}
                            <strong className='text-capitalize'>
                              {' '}
                              Chi tiết
                            </strong>
                          </strong>
                        </Button>
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card
                    border='danger'
                    className='shadow card_color'
                    style={{ height: '16rem' }}
                  >
                    <Card.Body>
                      <Card.Title className='text-center'>
                        <h4>Doanh thu</h4>
                      </Card.Title>
                      <Card.Subtitle className='mb-3 mt-5 text-center text-muted'>
                        Tổng số doanh thu từ các đơn hàng
                      </Card.Subtitle>
                      <Card.Title className='text-center mb-4'>
                        <h2
                          style={{ fontSize: '2.5rem' }}
                          className='text-lowercase'
                        >
                          {/* {orders?.totalAmount &&
                            format(orders?.totalAmount, 'đ')} */}
                        </h2>
                      </Card.Title>

                      <Card.Link
                        href='/admin/orderlist'
                        className='d-flex justify-content-end'
                      >
                        <Button color='secondary'>
                          <strong className='text-capitalize'> Chi tiết</strong>
                        </Button>
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card
                    border='success'
                    className='shadow card_color'
                    style={{ height: '16rem' }}
                  >
                    <Card.Body>
                      <Card.Title className='text-center'>
                        <h4>Tổng số sản phẩm</h4>
                      </Card.Title>
                      <Card.Subtitle className='mb-2 mt-3 text-center text-muted'>
                        Tổng số sản phẩm đang được bày bán
                      </Card.Subtitle>
                      <Card.Title className='text-center'>
                        <h1 style={{ fontSize: '3rem' }}>
                          {products && products.length}
                        </h1>
                      </Card.Title>
                      <Card.Subtitle className='mb-2 text-center'>
                        <h5 className='text-muted'>Sản phẩm</h5>
                      </Card.Subtitle>
                      <Card.Link
                        href='/admin/productlist'
                        className='d-flex justify-content-end'
                      >
                        <Button color='secondary'>
                          {' '}
                          <strong className='text-capitalize'> Chi tiết</strong>
                        </Button>
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card
                    border='danger'
                    className='shadow card_color'
                    style={{ height: '16rem' }}
                  >
                    <Card.Body>
                      <Card.Title className='text-center'>
                        <h4>Tổng số nhà cung cấp</h4>
                      </Card.Title>
                      <Card.Subtitle className='mb-3 mt-4 text-center text-muted'>
                        Tổng số nhà cung cấp sản phẩm
                      </Card.Subtitle>
                      <Card.Title className='text-center'>
                        <h1 style={{ fontSize: '3rem' }}>
                          {supplier && supplier.length}
                        </h1>
                      </Card.Title>
                      <Card.Subtitle className='mb-2 text-center'>
                        <h5 className='text-muted'>Nhà cung cấp</h5>
                      </Card.Subtitle>
                      <Card.Link
                        href='/admin/supplierlist'
                        className='d-flex justify-content-end'
                      >
                        <Button color='secondary'>
                          {' '}
                          <strong className='text-capitalize'> Chi tiết</strong>
                        </Button>
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
            <div>
              <Row className='p-3 '>
                <Col md={3}>
                  <Card
                    border='success'
                    className='shadow card_color'
                    style={{ height: '16rem' }}
                    text='light'
                  >
                    <Card.Body>
                      <Card.Title className='text-center'>
                        <h4>Tổng số sản phẩm hết hàng</h4>
                      </Card.Title>
                      <Card.Subtitle className='mb-2 text-center text-muted'>
                        Tổng số sản phẩm hết hàng
                      </Card.Subtitle>
                      <Card.Title className='text-center'>
                        <h1 style={{ fontSize: '3rem' }}>{outOfStock}</h1>
                      </Card.Title>
                      <Card.Subtitle className='mb-3  mt-4 text-center'>
                        <h5 className='text-muted'>Sản phẩm</h5>
                      </Card.Subtitle>
                      <Card.Link
                        href='/admin/productlist'
                        className='d-flex justify-content-end border-top border-4'
                      >
                        <Button color='secondary'>
                          {' '}
                          <strong className='text-capitalize'> Chi tiết</strong>
                        </Button>
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AdminScreen
