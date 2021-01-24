import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

Product.propTypes = {}

function Product({ product }) {
  return (
    <Card className='my-3 rounded shadow'>
      <Link to={`/product/${product._id}`} className='hover-zoom bg-image'>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews}  reviews`}
          />
        </Card.Text>

        <Card.Text as='h5'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
