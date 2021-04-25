import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen({ match, history }) {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  useEffect(() => {
    // dispatch(getUserDetails(userInfo._id))
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber, userInfo])

  return (
    <>
      <Meta />
      {!keyword && (
        <ProductCarousel className='m-0' style={{ width: '100vh' }} />
      )}
      <h3 className='m-5 mb-0'>Latest Product</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='ml-5 mr-5'>
            {products?.map((
              product // phai co ? de kiem tra product === null
            ) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center'>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
