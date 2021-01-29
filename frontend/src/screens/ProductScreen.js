import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions.js'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

ProductScreen.propTypes = {}

function ProductScreen({ history, match }) {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

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
        <Row className='container-productGreen'>
          <Col md={5} className='p-0 img-productGreen'>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={7} className='text-left p-1'>
            <Row className='pl-4'>
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

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>

              <ListGroup variant='flush' className='border-0 pt-0'>
                <div className='group-items p-1 ml-4'>
                  <ListGroup.Item className='border-0 pt-0 pb-0 mb-0 group-items'>
                    <h2>${product.price}</h2>
                  </ListGroup.Item>

                  <ListGroup.Item className='border-0 group-items'>
                    Status:{' '}
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
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
      )}
    </>
  )
}

export default ProductScreen
