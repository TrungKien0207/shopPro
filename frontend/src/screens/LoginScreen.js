import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

LoginScreen.propTypes = {}

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <FormContainer>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form
        onSubmit={submitHandler}
        className='bg-light rounded shadow p-5 mt-4'
      >
        <h2 className='text-center'>Sign in</h2>
        <Form.Group controlId='email' className='pt-3'>
          <Form.Label as='p' className='mb-1'>
            Email address
          </Form.Label>
          <Form.Control
            className='border border-grey rounded-pill'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label as='p' className='mb-1'>
            Password
          </Form.Label>
          <Form.Control
            className='border border-grey rounded-pill'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div>
          <Button
            type='submit'
            variant='outline-success'
            className='btn-block shadow rounded-pill'
            style={{ fontSize: '1rem', letterSpacing: '0.25rem' }}
          >
            LOGIN
          </Button>
        </div>

        <Row className='py-3'>
          <Col
            className='d-flex align-items-center'
            style={{ fontSize: '1rem', letterSpacing: '0.15rem' }}
          >
            New Customer?{' '}
            <Link
              className='text-decoration-none text-danger pl-1 '
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              <Button
                className='p-1 rounded-pill shadow'
                variant='outline-warning'
                style={{ letterSpacing: '0.15rem' }}
              >
                Register
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
