import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCategoriesAdm } from '../../actions/categoryAction'
import { createProduct } from '../../actions/productActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import MessageSuccess from '../../components/MessageSuccess'
import Announcement from '../../components/Announcement'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import SideBar from './components/SideBar'
import Header from './components/Header'
import { listSupplierAdm } from '../../actions/supplierActions'

function formatPrice(n, currency) {
  return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

const ProductCreateScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [categoryy, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [mass, setMass] = useState('')
  const [hdsd, setHdsd] = useState('')
  const [hdbq, setHdbq] = useState('')
  const [supplierr, setSupplier] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate

  const categoriesList = useSelector((state) => state.categoriesList)
  const { category } = categoriesList

  const supplierListAdm = useSelector((state) => state.supplierListAdm)
  const { supplier } = supplierListAdm

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct({
        name,
        price,
        description,
        image,
        brand,
        categoryy,
        countInStock,
        supplierr,
        hdsd,
        hdbq,
        mass,
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
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
    } else {
      if (userInfo) {
        dispatch(listCategoriesAdm())
        dispatch(listSupplierAdm())
      }
    }
  }, [dispatch, userInfo, successCreate])
  return (
    <>
      <Header />
      <Row style={{ backgroundColor: '#b68973' }}>
        <Col md={2} className='p-0 '>
          <SideBar />
        </Col>
        <Col md={10} className='pl-0 pr-4 '>
          <>
            {/* {loadingCreate && (
            <Announcement variant='success'> Thêm thành công</Announcement>
          ) && <Loader />}
        {errorCreate && <Announcement>{errorCreate}</Announcement>} */}
            {loadingCreate && (
              <MessageSuccess variant='Thêm thành công'> </MessageSuccess>
            )}
            {loadingCreate ? (
              <Loader />
            ) : errorCreate ? (
              <Message>{errorCreate}</Message>
            ) : (
              <>
                <Form
                  onSubmit={submitHandler}
                  className='bg-light border-0 pt-3 pb-3'
                  fluid
                >
                  <h2 className='text-center mb-4'>Thêm sản phẩm</h2>

                  <Form.Group controlId='name' className='pl-3 pr-3'>
                    <Form.Label as='p' className='mb-1'>
                      Tên sản phẩm
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
                      Ảnh
                    </Form.Label>

                    <Row>
                      <Col md={6} className='align-items-center d-flex'>
                        <Form.File
                          className='border border-grey'
                          id='image-file'
                          label='Choose File'
                          custom
                          onChange={uploadFileHandler}
                        ></Form.File>
                      </Col>
                      <Col md={2}>
                        {image && (
                          <Image
                            style={{
                              width: '4rem',
                              height: '4rem',
                            }}
                            src={image}
                            className='rounded avatar_img'
                            fluid
                          />
                        )}
                      </Col>
                    </Row>
                    {uploading && <Loader />}
                  </Form.Group>

                  <Row>
                    <Col md={3}>
                      <Form.Group controlId='brand' className='pl-3 pr-3'>
                        <Form.Label as='p' className='mb-1 text-center'>
                          Thể loại
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
                      <Form.Group
                        controlId='countInStock'
                        className='pl-3 pr-3'
                      >
                        <Form.Label as='p' className='mb-1 text-center'>
                          Số lượng trong kho
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
                          Danh mục
                        </Form.Label>
                        <Form.Control
                          className='border border-grey rounded-pill '
                          type='text'
                          as='select'
                          placeholder='Enter category'
                          value={categoryy}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option></option>
                          {category &&
                            category.map((cat, index) => (
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
                          Giá
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

                  <Row>
                    <Col md={6}>
                      <Form.Group
                        controlId='countInStock'
                        className='pl-3 pr-3'
                      >
                        <Form.Label as='p' className='mb-1 text-center'>
                          Khối lượng
                        </Form.Label>
                        <Form.Control
                          className='border border-grey rounded-pill text-center'
                          type='text'
                          placeholder='Enter countInStock'
                          value={mass}
                          onChange={(e) => setMass(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId='category' className='pl-3 pr-3'>
                        <Form.Label as='p' className='mb-1 text-center'>
                          Nhà cung cấp
                        </Form.Label>
                        <Form.Control
                          className='border border-grey rounded-pill '
                          type='text'
                          as='select'
                          placeholder='Enter category'
                          value={supplierr}
                          onChange={(e) => setSupplier(e.target.value)}
                        >
                          <option></option>
                          {supplier &&
                            supplier.map((cat, index) => (
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
                  </Row>

                  <Form.Group controlId='description' className='pl-3 pr-3'>
                    <Form.Label as='p' className='mb-1 ml-5'>
                      Nội dung
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

                  <Form.Group controlId='description' className='pl-3 pr-3'>
                    <Form.Label as='p' className='mb-1 ml-5'>
                      Hướng dẫn sử dụng
                    </Form.Label>
                    <Form.Control
                      className='border border-grey rounded-pill'
                      type='text'
                      rows={3}
                      as='textarea'
                      placeholder='Enter description'
                      value={hdsd}
                      onChange={(e) => setHdsd(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='description' className='pl-3 pr-3'>
                    <Form.Label as='p' className='mb-1 ml-5'>
                      Hướng dẫn bảo quản
                    </Form.Label>
                    <Form.Control
                      className='border border-grey rounded-pill'
                      type='text'
                      rows={3}
                      as='textarea'
                      placeholder='Enter description'
                      value={hdbq}
                      onChange={(e) => setHdbq(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <div className='pl-3 pr-3 text-center'>
                    <Button
                      type='submit'
                      variant='outline-light'
                      className='rounded-pill btn_color_created'
                      style={{
                        fontSize: '1rem',
                        letterSpacing: '0.25rem',
                        width: '20rem',
                      }}
                    >
                      Tạo
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </>
        </Col>
      </Row>
    </>
  )
}

export default ProductCreateScreen
