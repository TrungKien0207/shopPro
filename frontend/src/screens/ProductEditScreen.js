import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCategoriesAdm } from '../actions/categoryAction'
import { listProductDetails, updateProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import MessageSuccess from '../components/MessageSuccess'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen({ match, history }) {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const categoriesList = useSelector((state) => state.categoriesList)
  const {
    loading: loadingCat,
    error: errorCat,
    category: categoryCat,
  } = categoriesList

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const submitHandler = (e) => {
    e.preventDefault()
    //UPDATE PRODUCT
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/uploads', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      // history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        if (userInfo) {
          dispatch(listProductDetails(productId))
          dispatch(listCategoriesAdm())
        }
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, userInfo, history, productId, product, successUpdate])

  return (
    <>
      <Container>
        <Link
          to='/admin/productlist'
          className='btn btn-light my-3 text-uppercase rounded-pill'
        >
          <i class='fas fa-arrow-left pr-2'></i>
          Quay về
        </Link>
        {loadingUpdate && (
            <MessageSuccess variant='Đã cập nhật thành công'></MessageSuccess>
          ) && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <Form
              onSubmit={submitHandler}
              className='p-4 bg-light shadow card_color'
              fluid
            >
              <h2 className='text-center mb-4'>Edit Product</h2>

              <Form.Group controlId='name' className='pl-3 pr-3'>
                <Form.Label as='p' className='mb-1'>
                  Name
                </Form.Label>
                <Form.Control
                  className='border border-grey rounded-pill'
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image' className='pl-3 pr-3'>
                <Form.Label as='p' className='mb-1'>
                  Image
                </Form.Label>
                <Form.Control
                  className='border border-grey'
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  className='border border-grey'
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>

              <Row>
                <Col md={3}>
                  <Form.Group controlId='brand' className='pl-3 pr-3'>
                    <Form.Label as='p' className='mb-1 text-center'>
                      Brand
                    </Form.Label>
                    <Form.Control
                      className='border border-grey rounded-pill'
                      type='text'
                      placeholder='Enter brand'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId='countInStock' className='pl-3 pr-3'>
                    <Form.Label as='p' className='mb-1 text-center'>
                      Count In Stock
                    </Form.Label>
                    <Form.Control
                      className='border border-grey rounded-pill text-center'
                      type='number'
                      placeholder='Enter countInStock'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId='category' className='pl-3 pr-3'>
                    <Form.Label as='p' className='mb-1 text-center'>
                      Category
                    </Form.Label>
                    <Form.Control
                      className='border border-grey rounded-pill '
                      type='text'
                      as='select'
                      placeholder='Enter category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option></option>
                      {categoryCat &&
                        categoryCat.map((cat, index) => (
                          <option
                            style={{ color: 'black' }}
                            key={index}
                            value={cat._id}
                          >
                            {cat.name}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId='price' className='pl-3 pr-3'>
                    <Form.Label as='p' className='mb-1 text-center'>
                      Price
                    </Form.Label>
                    <Form.Control
                      className='border border-grey rounded-pill text-center'
                      type='number'
                      placeholder='Enter price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId='description' className='pl-3 pr-3'>
                <Form.Label as='p' className='mb-1'>
                  Description
                </Form.Label>
                <Form.Control
                  className='border border-grey rounded-pill'
                  type='text'
                  rows={3}
                  as='textarea'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className='pl-3 pr-3 text-center'>
                <Button
                  type='submit'
                  variant='outline-success'
                  className='rounded-pill'
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '0.25rem',
                    width: '20rem',
                  }}
                >
                  Update
                </Button>
              </div>
            </Form>
          </>
        )}
      </Container>
    </>
  )
}

export default ProductEditScreen
