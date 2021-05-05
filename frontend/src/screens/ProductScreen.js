import Avatar from '@material-ui/core/Avatar'
import Buttonn from '@material-ui/core/Button'
import ButtonGroupp from '@material-ui/core/ButtonGroup'
import { deepOrange } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import RemoveIcon from '@material-ui/icons/Remove'
import SendIcon from '@material-ui/icons/Send'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  createProductReview,
  listProductDetails,
} from '../actions/productActions.js'
import ActiveRating from '../components/ActiveRating'
import Announcement from '../components/Announcement.js'
import MessageSuccess from '../components/MessageSuccess.js'
import ButtonComponent from '../components/ButtonComponent'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Rating from '../components/Rating'
import SkeletonEffect from '../components/SkeletonEffect'
import { Skeleton } from 'antd'
import { format, utcToZonedTime } from 'date-fns-tz'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants.js'
import ProgressLine from '../components/ProgressLine.js'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'

format(new Date(2014, 1, 11), 'dd/MM/yyyy')

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },

    '& .MuiInputBase-input': {
      padding: theme.spacing(1),
    },

    '& .MuiFilledInput-input': {
      padding: theme.spacing(1),
    },

    '& .MuiFilledInput-inputMarginDense': {
      padding: theme.spacing(1),
      textAlign: 'center',
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
    textAlign: 'center',
  },
  form: {
    width: 1150,
  },
}))

function formatPrice(n, currency) {
  return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

function ProductScreen({ history, match }) {
  const classes = useStyles()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [hover, setHover] = React.useState(-1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment(' ')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const submitHandle = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
    toast.success(
      <div>
        <CheckCircleOutlineIcon className='pr-1' fontSize='large' />
        Đã đánh giá thành công
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

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      {/* {successProductReview && <MessageSuccess variant='Success' />} */}
      <Header />
      <div className='ml-4 mr-4 mb-4'>
        <Link className='btn btn-light my-3 rounded-pill' to='/'>
          <i className='fas fa-arrow-left pr-2'></i>
          Quay lại
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Row className='container-productGreen mb-2 rounded shadow card_color'>
              <Col md={6} className='p-3 img-productGreen'>
                <Image
                  className='rounded'
                  src={product.image}
                  alt={product.name}
                  fluid
                />
              </Col>

              <Col md={6} className='text-left p-1'>
                <Row className='pl-4 pr-2'>
                  <ListGroup variant='flush' className='pr-3'>
                    <ListGroup.Item className='border-0 pb-0'>
                      <strong>
                        <h3 className='border-0 pb-0'>{product.name}</h3>
                      </strong>
                    </ListGroup.Item>

                    <ListGroup.Item className='border-0 pb-0'>
                      <Rating
                        value={product.rating}
                        text={`(${product.numReviews} đánh giá)`}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item className='text-justify'>
                      <p className='mb-0'>{product.description}</p>
                    </ListGroup.Item>
                    <ListGroup.Item className='text-justify'>
                      <Row>
                        <Col md={6} className='d-flex align-items-center'>
                          <h6 className='mb-0 pr-2'>Khối lượng</h6>
                          <p className='mb-0'>{product.mass}</p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className='text-justify'>
                      <h6 className='mb-0'>Hướng dẫn sử dụng</h6>
                      <p className='mb-0'>{product.hdsd}</p>
                    </ListGroup.Item>
                    <ListGroup.Item className='text-justify border-bottom mb-2'>
                      <h6 className='mb-0'>Bảo quản</h6>
                      <p className='mb-0'>{product.hdbq}</p>
                    </ListGroup.Item>
                  </ListGroup>

                  <ListGroup variant='flush' className='border-0 pt-0 mb-4'>
                    <div className='group-items pt-2 pb-2 ml-4 mr-4 rounded shadow'>
                      <ListGroup.Item className='border-0 pt-0 pb-0 mb-0 pr-0 group-items'>
                        <h2 className='text-lowercase'>
                          {product.price && formatPrice(product.price, 'đ')}
                        </h2>
                      </ListGroup.Item>

                      <ListGroup.Item className='border-0 group-items'>
                        {product.countInStock > 0 ? (
                          <div className='d-flex justify-content-start align-items-center'>
                            <p className='mb-0'>Trạng thái:</p>
                            <p className='mb-0 fw-bold ml-2 text-success'>
                              Còn hàng
                            </p>
                          </div>
                        ) : (
                          <div className='d-flex justify-content-start align-items-center'>
                            <p className='mb-0'>Trạng thái:</p>
                            <Image src='https://img.icons8.com/fluent/35/000000/close-sign.png' />
                            <p className='mb-0 fw-bold ml-2 danger'>Hết hàng</p>
                          </div>
                        )}
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item className='border-0 pt-0 pb-0 group-items '>
                          <Row>
                            <Col md={4} className='d-flex align-items-center'>
                              <p className='mb-0'>Số lượng:</p>
                            </Col>
                            <Col md={4} className='d-flex'>
                              <ButtonGroupp size='small' aria-label='small '>
                                <Buttonn
                                  aria-label='reduce'
                                  size='small'
                                  color='primary'
                                  onClick={() => {
                                    setQty(Math.max(qty - 1, 1))
                                  }}
                                  variant='contained'
                                >
                                  <RemoveIcon fontSize='small' />
                                </Buttonn>
                                {/* {qty === 0 ? (
                                <Buttonn variant='contained'>1</Buttonn>
                              ) : (
                                <Buttonn variant='contained'>{qty}</Buttonn>
                              )} */}
                                <div>
                                  <TextField
                                    className={classes.root}
                                    id='filled-size-small'
                                    value={qty}
                                    variant='filled'
                                    size='small'
                                    onChange={(e) => setQty(e.target.value)}
                                  />
                                </div>
                                <Buttonn
                                  aria-label='increase'
                                  size='small'
                                  onClick={() => {
                                    setQty(qty + 1)
                                  }}
                                  variant='contained'
                                  color='primary'
                                >
                                  <AddIcon fontSize='small' />
                                </Buttonn>
                              </ButtonGroupp>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                    </div>

                    <ListGroup.Item className='ml-4 pl-0 pr-0 pb-0 mr-4'>
                      <Button
                        onClick={addToCartHandler}
                        className='btn-block btn_color rounded-pill'
                        type='button'
                        disabled={product.countInStock === 0}
                        style={{ fontSize: '1em', width: '20rem' }}
                      >
                        <AddShoppingCartIcon />
                        <strong className='pl-1 '>Thêm vào giỏ hàng</strong>
                        <div className='wave'></div>
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </Col>
            </Row>

            {loading ? (
              <Loader />
            ) : (
              <Row>
                <Col className='mt-3 p-3 pl-5 pr-5 background-light rounded shadow card_color'>
                  <h5 className='text-uppercase'>Đánh giá sản phẩm</h5>
                  {product.reviews.length === 0 && (
                    <Row>
                      <Col md={4}>
                        <Announcement variant='warning'>
                          Không có đánh giá{' '}
                          <Image src='https://img.icons8.com/fluent/24/000000/box-important.png' />
                        </Announcement>
                      </Col>
                    </Row>
                  )}
                  <div
                    className=' rounded text-center circle-rate pt-2 pb-1 ml-3 mb-2'
                    style={{ width: '14rem' }}
                  >
                    <h5 className=''>Điểm</h5>
                    <h4 className='mb-0'>{product.rating + ' trên 5'}</h4>
                  </div>

                  <ListGroup variant='flush'>
                    {loadingProductReview ? (
                      <>
                        {/* <MessageSuccess variant='Success' /> */}
                        <Skeleton avatar paragraph={{ rows: 1 }} />
                      </>
                    ) : (
                      product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <div className='d-flex justify-content-start'>
                            {/* <Row>
                        <Col md={1} className=''> */}
                            <div className='pr-2'>
                              {review ? (
                                <Image
                                  className='rounded-circle'
                                  src={user.avatar}
                                  style={{ height: '2rem', width: '2rem' }}
                                />
                              ) : (
                                <Avatar className={classes.orange}>
                                  {review.name.substring(0, 1)}
                                </Avatar>
                              )}
                            </div>
                            {/* </Col>
                        <Col> */}
                            <div>
                              <div className='d-flex'>
                                <h5 className='mb-0 text-capitalize'>
                                  {review.name}
                                </h5>
                                <span className='pl-2'>
                                  <Rating value={review.rating} />
                                </span>
                              </div>
                              <div
                                style={{
                                  fontWeight: '200',
                                  color: 'gray',
                                  fontSize: '0.65rem',
                                }}
                              >
                                <p className='mb-1'>
                                  {format(
                                    new utcToZonedTime(
                                      review.createdAt,
                                      'Asia/Ho_Chi_Minh'
                                    ),
                                    'HH:mm:ss - MM/dd/yyyy',
                                    { timeZone: 'Asia/Ho_Chi_Minh' }
                                  )}
                                </p>
                              </div>
                            </div>
                            {/* </Col>
                      </Row> */}
                          </div>
                          <strong
                            className='ml-3'
                            style={{ fontWeight: '500', color: 'black' }}
                          >
                            {review.comment}
                          </strong>
                        </ListGroup.Item>
                      ))
                    )}

                    <ListGroup.Item shadow>
                      {loadingProductReview && <ProgressLine />}
                      <h5>
                        ĐÁNH GIÁ VÀ BÌNH LUẬN{' '}
                        <Image src='https://img.icons8.com/fluent/24/000000/favorite-chat.png' />
                      </h5>

                      {errorProductReview && (
                        <Message>{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandle}>
                          <Form.Group controlId='rating'>
                            <Form.Label as='h5' className='text-capitalize'>
                              Đánh giá
                            </Form.Label>
                            <ActiveRating
                              value={rating}
                              hover={hover}
                              setValue={setRating}
                              setHover={setHover}
                              size='large'
                            />
                          </Form.Group>

                          <Form.Group
                            controlId='comment'
                            className={classes.root}
                          >
                            <TextField
                              className={classes.form}
                              id='outlined-multiline-static'
                              label='Bình luận'
                              multiline
                              rows={2}
                              value={comment}
                              // defaultValue='Default Value'
                              // variant='outlined'
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </Form.Group>
                          <ButtonComponent
                            type='submit'
                            color='secondary'
                            size='large'
                            value='GỬI'
                            disabled={loadingProductReview}
                            endIcon={<SendIcon />}
                          ></ButtonComponent>
                          <ToastContainer />
                        </Form>
                      ) : (
                        <Announcement
                          variant='dark'
                          style={{ color: '#82FF9E' }}
                        >
                          Vui lòng{' '}
                          <Link
                            to='/login'
                            style={{
                              color: '#5FAD41',
                              textDecoration: 'none',
                              fontWeight: '700',
                            }}
                          >
                            Đăng nhập
                          </Link>{' '}
                          để đánh giá
                        </Announcement>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default ProductScreen
