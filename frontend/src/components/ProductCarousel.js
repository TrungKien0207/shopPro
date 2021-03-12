import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'
import Slider from '@ant-design/react-slick'

const ProductCarousel = () => {
  var settings = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplaySpeed: 2500,
    cssEase: 'linear',
    autoplay: true,
  }

  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Slider
      {...settings}
      className='bg-light ml-5 mr-5 border-0 shadow rounded'
    >
      {products.map((product) => (
        <Carousel.Item key={product._id} className='slick-slide'>
          <Link to={`/product/${product._id}`} className='text-decoration-none'>
            <Image
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '80vh' }}
            />

            <Carousel.Caption className='slick-slide-title'>
              <h4>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Slider>
    // <Carousel pause='hover' className='bg-dark border-0'>
    //   {products.map((product) => (
    //     <Carousel.Item key={product._id}>
    //       <Link to={`/product/${product._id}`}>
    //         <Image src={product.image} alt={product.name} fluid />
    //         <Carousel.Caption className='carousel-caption'>
    //           <h5>
    //             {product.name} (${product.price})
    //           </h5>
    //         </Carousel.Caption>
    //       </Link>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
  )
}

export default ProductCarousel
