import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import configAuth from '../configAuth'

const firebaseApp = firebase.initializeApp(configAuth)

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLogin, setIsLogin] = useState(false)
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [photo, setPhoto] = useState('')

  const onSubmit = () => {
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential

        var token = credential.accessToken

        const { user } = result

        const email = user.email
        const name = user.displayName
        const avatar = user.photoURL
        const password = ''

        dispatch(register(name, email, avatar, password))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User signed in')
        console.log(user.displayName + '\n' + user.email)
        setIsLogin(true)
        setName(user.displayName)
        setPhoto(user.photoURL)
        setMail(user.email)
        // history.push(redirect)
      } else {
        console.log('No User')
      }
    })
  }, [])

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
        className='bg-light rounded shadow p-5 mt-4 card_color'
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

        <div className='mt-2'>
          <Button
            type='submit'
            variant='outline-success'
            className='btn-block shadow rounded-pill mb-3'
            style={{ fontSize: '0.875rem', letterSpacing: '0.25rem' }}
            size='sm'
          >
            LOGIN
          </Button>
          {isLogin === false ? (
            <Button
              variant='outline-light'
              className='btn-block shadow rounded-pill btn_gg'
              style={{
                fontSize: '0.875rem',
                letterSpacing: '0.25rem',
                border: '1px solid #ddd',
                color: '#1a1a1a',
              }}
              onClick={onSubmit}
              size='sm'
            >
              <Image
                src='https://img.icons8.com/fluent/20/000000/google-logo.png'
                className='pr-1'
              />
              Login with Google
            </Button>
          ) : (
            <Button
              variant='outline-light'
              className='btn-block shadow rounded-pill btn_gg'
              style={{
                fontSize: '0.875rem',
                letterSpacing: '0.25rem',
                border: '1px solid #ddd',
                color: '#1a1a1a',
              }}
              onClick={onSubmit}
              size='sm'
            >
              <Image
                src='https://img.icons8.com/fluent/20/000000/google-logo.png'
                className='pr-1'
              />
              Login with Google
            </Button>
          )}
        </div>

        <Row className='py-3'>
          <Col
            className='d-flex align-items-center justify-content-center'
            style={{
              fontSize: '1rem',
              letterSpacing: '0.15rem',
            }}
          >
            <div>
              New Customer?{' '}
              <Link
                className='text-decoration-none text-info pl-1'
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                style={{ fontWeight: '700' }}
              >
                Register
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
