import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { deepOrange } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(8),
    height: theme.spacing(8),
    fontSize: '3rem',
  },
}))

function RegisterScreen({ location, history }) {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(register(name, email, avatar, password))
    }
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

      setAvatar(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <>
      <Row className='shadow p-5 card_color m-0'>
        <Col md={7}>
          <Image src='/background/3071357.jpg' fluid />
        </Col>
        <Col md={5}>
          <div>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <h2 className='text-center'>Đăng kí</h2>
              <Form.Group controlId='name'>
                <Form.Label as='p' className='mb-1'>
                  Họ và tên
                </Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Nhập họ và tên'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='border border-grey rounded-pill'
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label as='p' className='mb-1'>
                  Địa chỉ email
                </Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Nhập địa chỉ email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='border border-grey rounded-pill'
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label as='p' className='mb-1'>
                  Mật khẩu
                </Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Nhập mật khẩu'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='border border-grey rounded-pill'
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label as='p' className='mb-1'>
                  Nhập lại mật khẩu
                </Form.Label>
                <Form.Control
                  type='password'
                  placeholder=' Nhập lại mật khẩu'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='border border-grey rounded-pill'
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label as='p' className='mb-1'>
                  Ảnh đại diện
                </Form.Label>
                <Row>
                  <div className='d-flex align-items-center'>
                    <Col md={6}>
                      {avatar && (
                        <Image
                          src={avatar}
                          className='rounded-circle avatar_img'
                          fluid
                        />
                      )}
                    </Col>
                    <Col md={6}>
                      <Form.File
                        className='border border-grey'
                        id='image-file'
                        label='Chọn ảnh'
                        custom
                        onChange={uploadFileHandler}
                      ></Form.File>
                      {uploading && <Loader />}
                    </Col>
                  </div>
                </Row>
              </Form.Group>

              <div>
                <Button
                  type='submit'
                  variant='outline-light'
                  className='btn-block  rounded-pill btn_color_created'
                  style={{ fontSize: '0.875rem', letterSpacing: '0.25rem' }}
                >
                  Đăng kí
                </Button>
              </div>

              <Row className='py-3'>
                <Col
                  className='d-flex align-items-center justify-content-center'
                  style={{ fontSize: '0.8rem', letterSpacing: '0.05rem' }}
                >
                  <div>
                    Bạn đã có tài khoản?
                    <Link
                      className='text-decoration-none text-info pl-1 '
                      to={redirect ? `/login?redirect=${redirect}` : '/login'}
                      style={{ fontWeight: '700' }}
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default RegisterScreen
