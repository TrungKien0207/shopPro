import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryDetails } from '../actions/categoryAction'
import { getProductOfCategory } from '../actions/productActions'
import FilterNav from '../components/FilterNav'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import SkeletonEffect from '../components/SkeletonEffect'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import DoneIcon from '@material-ui/icons/Done'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

const ProductOfCategoryScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const catId = match.params.id

  const classes = useStyles()

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  const dispatch = useDispatch()

  const productOfCategory = useSelector((state) => state.productOfCategory)
  const { loading, error, products, pages, page } = productOfCategory

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading: loadingCat, success: successCat, category } = categoryDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productFilter = useSelector((state) => state.productFilter)
  const {
    loading: loadingFilter,
    success: successFilter,
    product: productsFilter,
  } = productFilter

  const productFilterPrice = useSelector((state) => state.productFilterPrice)
  const {
    loading: loadingFilterPrice,
    success: successFilterPrice,
    product: productsFilterPrice,
  } = productFilterPrice

  // console.log('product', product)

  useEffect(() => {
    dispatch(getProductOfCategory(catId))

    if (userInfo) {
      dispatch(getCategoryDetails(catId))
    }
  }, [dispatch, userInfo, catId])

  return (
    <>
      <div className='pt-2'>
        <Meta />

        {loading ? (
          <SkeletonEffect />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row
              className='card_color shadow ml-2 mr-2'
              style={{ minHeight: '105vh', backgroundColor: '#f8e4b7' }}
            >
              <Col md={3} className='border-right border-danger'>
                <FilterNav />
              </Col>
              <Col md={9}>
                <div className='pt-2 pl-3 pr-3 '>
                  {/* <div className='text-center'>
                    <h5>{category && category.name}</h5>
                  </div> */}
                  <Col md={12} className='d-flex justify-content-center '>
                    {productsFilter &&
                      productsFilter.map((prod) => (
                        <Chip
                          variant='outlined'
                          color='primary'
                          size='small'
                          label={prod.category.name}
                        />
                      ))}
                  </Col>
                  <Row>
                    {/* {loadingFilterPrice ? (
                      <SkeletonEffect />
                    ) : productsFilterPrice ? (
                      productsFilterPrice.map((
                        product // phai co ? de kiem tra product === null
                      ) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                          <Product product={product} />
                        </Col>
                      ))
                    ) : */}
                    {loadingFilter ? (
                      <SkeletonEffect />
                    ) : productsFilter ? (
                      productsFilter.map((
                        product // phai co ? de kiem tra product === null
                      ) => (
                        <>
                          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                          </Col>
                        </>
                      ))
                    ) : productsFilterPrice ? (
                      productsFilterPrice.map((
                        product // phai co ? de kiem tra product === null
                      ) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                          <Product product={product} />
                        </Col>
                      ))
                    ) : (
                      products.map((
                        product // phai co ? de kiem tra product === null
                      ) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                          <Product product={product} />
                        </Col>
                      ))
                    )}
                  </Row>
                  <div className='d-flex justify-content-center'>
                    <Paginate
                      pages={pages}
                      page={page}
                      // keyword={keyword ? keyword : ''}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  )
}

export default ProductOfCategoryScreen
