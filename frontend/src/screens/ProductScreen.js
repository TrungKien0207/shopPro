import React from 'react'
import { Col, Image, ListGroup, Row, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'

ProductScreen.propTypes = {}

function ProductScreen({ match }) {
  const product = products.find((p) => p._id === match.params.id)
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        <i class='fas fa-arrow-left pr-2'></i>
        Go back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4} className='text-left p-1'>
          <ListGroup variant='flush'>
            <ListGroup.Item className='border-0'>
              <strong>
                <h6>{product.name}</h6>
              </strong>
            </ListGroup.Item>

            <ListGroup.Item className='border-0'>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item className='border-0'>
              Price: ${product.price}
            </ListGroup.Item>

            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3} className='text-center'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className='btn-block btn-warning'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
