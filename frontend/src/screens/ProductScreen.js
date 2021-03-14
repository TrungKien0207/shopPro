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
import {
  createProductReview,
  listProductDetails,
} from '../actions/productActions.js'
import ActiveRating from '../components/ActiveRating'
import Announcement from '../components/Announcement.js'
import ButtonComponent from '../components/ButtonComponent'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Rating from '../components/Rating'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants.js'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
    },

    '& .MuiInputBase-input': {
      padding: theme.spacing(2),
    },

    '& .MuiFilledInput-input': {
      padding: theme.spacing(2),
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
    width: 1030,
  },
}))

function ProductScreen({ history, match }) {
  const classes = useStyles()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [hover, setHover] = React.useState(-1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

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
      ;<Announcement variant='success'>Review Submited</Announcement>
      setRating(0)
      setComment('')
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
  }

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        <i className='fas fa-arrow-left pr-2'></i>
        Go back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row className='container-productGreen mb-2 rounded shadow'>
            <Col md={5} className='p-3 img-productGreen'>
              <Image
                className='rounded'
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>

            <Col md={7} className='text-left p-1'>
              <Row className='pl-4 pr-2'>
                <ListGroup variant='flush' className='pr-3'>
                  <ListGroup.Item className='border-0 pb-0'>
                    <strong>
                      <h5>{product.name}</h5>
                    </strong>
                  </ListGroup.Item>

                  <ListGroup.Item className='border-0 pb-0'>
                    <Rating
                      value={product.rating}
                      text={`(${product.numReviews} reviews)`}
                    />
                  </ListGroup.Item>

                  <ListGroup.Item className='text-justify'>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>

                <ListGroup variant='flush' className='border-0 pt-0'>
                  <div className='group-items pt-2 pb-2 ml-4 mr-4 rounded shadow'>
                    <ListGroup.Item className='border-0 pt-0 pb-0 mb-0 pr-0 group-items'>
                      <h2>${product.price}</h2>
                    </ListGroup.Item>

                    <ListGroup.Item className='border-0 group-items'>
                      Status:{' '}
                      {product.countInStock > 0 ? (
                        'In Stock'
                      ) : (
                        <b className='danger'>
                          <Image src='https://img.icons8.com/fluent/35/000000/close-sign.png' />
                        </b>
                      )}
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item className='border-0 pt-0 pb-0 group-items '>
                        <Row>
                          <Col md={3}>Qty:</Col>
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
                      className='btn-block btn-danger'
                      type='button'
                      disabled={product.countInStock === 0}
                      style={{ fontSize: '1em' }}
                    >
                      <AddShoppingCartIcon />
                      <strong className='pl-1'>Add to Cart</strong>
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
              <Col className='mt-3 pt-3 pl-5 pr-5 background-light rounded shadow'>
                <h5 className='text-uppercase'>Đánh giá sản phẩm</h5>
                {product.reviews.length === 0 && (
                  <Announcement variant='warning'>
                    No reviews{' '}
                    <Image src='https://img.icons8.com/fluent/24/000000/box-important.png' />
                  </Announcement>
                )}
                <div
                  className=' rounded text-center circle-rate pt-2 pb-1'
                  style={{ width: '14rem' }}
                >
                  <h5 className=''>Điểm</h5>
                  <h4 className='mb-0'>{product.rating + ' trên 5'}</h4>
                </div>

                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <div className='d-flex justify-content-start'>
                        {/* <Row>
                        <Col md={1} className=''> */}
                        <div className='pr-2'>
                          {' '}
                          <Avatar className={classes.orange}>
                            {review.name.substring(0, 1)}
                          </Avatar>
                        </div>
                        {/* </Col>
                        <Col> */}
                        <div>
                          <div className='d-flex'>
                            <h5 className='mb-0'>{review.name}</h5>
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
                              {review.createdAt.substring(11, 19)}
                              {' : '}
                              {review.createdAt.substring(0, 10)}
                            </p>
                          </div>
                        </div>
                        {/* </Col>
                      </Row> */}
                      </div>
                      <strong style={{ fontWeight: '500', color: 'black' }}>
                        {review.comment}
                      </strong>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item shadow>
                    <h4>
                      ĐÁNH GIÁ VÀ BÌNH LUẬN{' '}
                      <Image src='https://img.icons8.com/fluent/24/000000/favorite-chat.png' />
                    </h4>
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <Message>{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandle}>
                        <Form.Group controlId='rating'>
                          <Form.Label as='h5'>ĐÁNH GIÁ</Form.Label>
                          <ActiveRating
                            value={rating}
                            hover={hover}
                            setValue={setRating}
                            setHover={setHover}
                            size='large'
                          />
                        </Form.Group>

                        <Form.Group controlId='comment'>
                          <TextField
                            className={classes.form}
                            id='outlined-multiline-static'
                            label='Bình luận'
                            multiline
                            rows={3}
                            // defaultValue='Default Value'
                            variant='outlined'
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
                      </Form>
                    ) : (
                      <Announcement variant='dark' style={{ color: '#82FF9E' }}>
                        Please{' '}
                        <Link
                          to='/login'
                          style={{
                            color: '#5FAD41',
                            textDecoration: 'none',
                            fontWeight: '700',
                          }}
                        >
                          Sign in
                        </Link>{' '}
                        to write a review
                      </Announcement>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  )
}

export default ProductScreen
