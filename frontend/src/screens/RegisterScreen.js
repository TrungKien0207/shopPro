import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'

function RegisterScreen({ location, history }) {
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
    <FormContainer>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='bg-light rounded shadow p-5'>
        <h2 className='text-center'>Sign up</h2>
        <Form.Group controlId='name'>
          <Form.Label as='p' className='mb-1'>
            Name
          </Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border border-grey rounded-pill'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label as='p' className='mb-1'>
            Email address
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-grey rounded-pill'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label as='p' className='mb-1'>
            Password
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-grey rounded-pill'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label as='p' className='mb-1'>
            Confirm Password
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='border border-grey rounded-pill'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label as='p' className='mb-1'>
            Avatar
          </Form.Label>
          <Form.Control
            className='border border-grey'
            type='text'
            placeholder='Enter image url'
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
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

        <div>
          <Button
            type='submit'
            variant='outline-success'
            className='btn-block shadow rounded-pill'
            style={{ fontSize: '1rem', letterSpacing: '0.25rem' }}
          >
            Register
          </Button>
        </div>

        <Row className='py-3'>
          <Col
            className='d-flex align-items-center'
            style={{ fontSize: '1rem', letterSpacing: '0.15rem' }}
          >
            Have an Account?
            <Link
              className='text-decoration-none text-danger pl-1 '
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
            >
              <Button
                className='p-1 rounded-pill shadow'
                variant='outline-warning'
                style={{ letterSpacing: '0.15rem' }}
              >
                Login
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
