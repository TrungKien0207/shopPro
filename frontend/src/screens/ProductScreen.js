import Buttonn from '@material-ui/core/Button'
import ButtonGroupp from '@material-ui/core/ButtonGroup'
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
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
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

                <ListGroup variant='flush' className='border-0 pt-0 '>
                  <div className='group-items pt-2 pb-2 ml-4 mr-4'>
                    <ListGroup.Item className='border-0 pt-0 pb-0 mb-0 pr-0 group-items'>
                      <h2>${product.price}</h2>
                    </ListGroup.Item>

                    <ListGroup.Item className='border-0 group-items'>
                      Status:{' '}
                      {product.countInStock > 0 ? (
                        'In Stock'
                      ) : (
                        <b className='danger'>Out of Stock</b>
                      )}
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item className='border-0 pt-0 pb-0 group-items'>
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

                  <ListGroup.Item className='ml-4 pl-0 pr-0 pb-0'>
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

          <Row>
            <Col className='mt-3 pt-3 pl-5 pr-5 background-light rounded shadow'>
              <h5 className='text-uppercase'>Đánh giá sản phẩm</h5>
              {product.reviews.length === 0 && (
                <Announcement variant='dark'>No reviews</Announcement>
              )}
              <div
                className=' rounded text-center circle-rate pt-1 pb-1'
                style={{ width: '14rem' }}
              >
                <h5 className=''>Điểm</h5>
                <h4 className='mb-0'>{product.rating + ' trên 5'}</h4>
              </div>

              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <div>
                      <Row>
                        <div className='col-sm-6 col-md-8 d-flex'>
                          <h6 className='mb-0'>{review.name}</h6>
                          <span className='pl-2'>
                            <Rating value={review.rating} />
                          </span>
                        </div>
                      </Row>
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
                    <strong style={{ fontWeight: '500', color: 'black' }}>
                      {review.comment}
                    </strong>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item shadow>
                  <h6>Write a Customer Review</h6>
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandle}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <ActiveRating
                          value={rating}
                          hover={hover}
                          setValue={setRating}
                          setHover={setHover}
                          size='large'
                        />
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
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
        </>
      )}
    </>
  )
}

export default ProductScreen
