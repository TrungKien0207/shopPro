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
import Rating from '../components/Rating'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants.js'

function ProductScreen({ history, match }) {
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
        <i class='fas fa-arrow-left pr-2'></i>
        Go back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='container-productGreen'>
            <Col md={5} className='p-0 img-productGreen'>
              <Image src={product.image} alt={product.name} fluid />
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
                  <div className='group-items p-1 ml-4'>
                    <ListGroup.Item className='border-0 pt-0 pb-0 mb-0 group-items'>
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
                          <Col md={4}>
                            <Form.Control
                              className='text-center'
                              type='number'
                              size='sm'
                              min='0'
                              defaultValue='1'
                              onChange={(e) => setQty(e.target.value)}
                            ></Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                  </div>

                  <ListGroup.Item className='ml-4 pl-0 pr-0'>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block btn-danger'
                      type='button'
                      disabled={product.countInStock === 0}
                      style={{ fontSize: '1em' }}
                    >
                      <strong>Add to Cart</strong>
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={5} className='p-0'>
              <h5>Reviews</h5>
              {product.reviews.length === 0 && (
                <Announcement variant='dark'>No reviews</Announcement>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>
                      {review.createdAt.substring(11, 19)}
                      {' : '}
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item shadow>
                  <h6>Write a Customer Review</h6>
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
                        value='Submit'
                        size='large'
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
