import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const Banner = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <Image
          className='d-block w-100'
          style={{ width: '100%', height: '80vh' }}
          src='/banner/dau-an-kankoo-23042021142425.jpg'
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='d-block w-100 h-80'
          style={{ width: '100%', height: '80vh' }}
          src='/banner/khuyen-mai-hot-2004202194944.jpg'
          alt='Second slide'
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='d-block w-100 h-80'
          style={{ width: '100%', height: '80vh' }}
          src='/banner/thuc-pham-giam-soc-20042021213548.jpg'
          alt='Third slide'
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default Banner
