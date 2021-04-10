import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryDetails, listCategories } from '../actions/categoryAction'
import {
  getProductOfCategory,
  productOfCategory,
} from '../actions/productActions'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import SkeletonEffect from '../components/SkeletonEffect'

const ProductOfCategoryScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const catId = match.params.id
  console.log('id category:', catId)

  const dispatch = useDispatch()

  const productOfCategory = useSelector((state) => state.productOfCategory)
  const { loading, error, products, pages, page } = productOfCategory

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading: loadingCat, success: successCat, category } = categoryDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getProductOfCategory(catId))

    if (userInfo) {
      dispatch(getCategoryDetails(catId))
    }
  }, [dispatch, userInfo, catId])

  return (
    <>
      <Meta />
      <h5>{category && category.name}</h5>
      {loading ? (
        <SkeletonEffect />
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
              // keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  )
}

export default ProductOfCategoryScreen
