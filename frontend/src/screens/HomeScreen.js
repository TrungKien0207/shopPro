import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
   listProducts,
   listTopRateProducts,
   listTopSoldProducts,
} from '../actions/productActions'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import Product from '../components/Product'

function HomeScreen({ match, history }) {
   const keyword = match.params.keyword
   const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const productList = useSelector((state) => state.productList)
   const { loading, error, products, pages, page } = productList

   const productTopRated = useSelector((state) => state.productTopRated)
   const {
      loading: loadingRate,
      error: errorRate,
      products: productsRate,
   } = productTopRated

   const productTopSold = useSelector((state) => state.productTopSold)
   const {
      loading: loadingSold,
      error: errorSold,
      products: productsSold,
   } = productTopSold

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userDetails = useSelector((state) => state.userDetails)
   const { user } = userDetails

   useEffect(() => {
      // dispatch(getUserDetails(userInfo._id))
      dispatch(listProducts(keyword, pageNumber))
      dispatch(listTopRateProducts())
      dispatch(listTopSoldProducts())
      window.scrollTo(0, 0)
   }, [dispatch, keyword, pageNumber, userInfo])

   return (
      <>
         <Meta />
         <Header />
         {/* {!keyword && (
        <ProductCarousel className='m-0' style={{ width: '100vh' }} />
      )} */}
         {!keyword && <Banner />}
         <div>
            <h3
               className='ml-5 mt-4 mb-0'
               style={{
                  borderBottom: '0.15rem solid #a20a0a',
                  width: '13rem',
               }}
            >
               Top bán chạy
            </h3>
            {loadingSold ? (
               <Loader />
            ) : errorSold ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <>
                  <Row
                     className='ml-5 mr-5'
                     style={{ borderBottom: '0.1rem solid #ddd' }}
                  >
                     {productsSold?.map(
                        (
                           product // phai co ? de kiem tra product === null
                        ) => (
                           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                           </Col>
                        )
                     )}
                  </Row>
               </>
            )}
         </div>

         <div>
            <h3
               className='ml-5 mt-4 mb-0'
               style={{
                  borderBottom: '0.15rem solid #a20a0a',
                  width: '12.8rem',
               }}
            >
               Top đánh giá
            </h3>
            {loadingRate ? (
               <Loader />
            ) : errorRate ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <>
                  <Row
                     className='ml-5 mr-5'
                     style={{ borderBottom: '0.1rem solid #ddd' }}
                  >
                     {productsRate?.map(
                        (
                           product // phai co ? de kiem tra product === null
                        ) => (
                           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                           </Col>
                        )
                     )}
                  </Row>
               </>
            )}
         </div>

         <div>
            <h3
               className='ml-5 mt-4 mb-0'
               style={{ borderBottom: '0.15rem solid #a20a0a', width: '16rem' }}
            >
               Tất cả sản phẩm
            </h3>
            {loading ? (
               <Loader />
            ) : error ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <>
                  <Row className='ml-5 mr-5'>
                     {products?.map(
                        (
                           product // phai co ? de kiem tra product === null
                        ) => (
                           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                           </Col>
                        )
                     )}
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
         </div>
         <Footer />
      </>
   )
}

export default HomeScreen
