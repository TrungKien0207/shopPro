import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Announcement from '../components/Announcement'
import Loader from '../components/Loader'
import '../toast.css'

function ProfileScreen({ location, history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const submitHandler = (e) => {
    e.preventDefault()
    error &&
      toast.error(
        <div>
          <ErrorOutlineIcon className='pr-1' fontSize='large' /> {error}
        </div>,
        {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )

    if (password !== confirmPassword) {
      toast.error(
        <div>
          <ErrorOutlineIcon className='pr-1' fontSize='large' /> Password is not
          match
        </div>,
        {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    } else {
      dispatch(
        updateUserProfile({ id: user._id, email, name, avatar, password })
      )
      toast.success(
        <div>
          <CheckCircleOutlineIcon className='pr-1' fontSize='large' />
          Profile Updated
        </div>,
        {
          className: 'Toastify__toast--success',
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
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
    if (!userInfo) {
      history.push()
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
        setAvatar(user.avatar)
      }
    }
  }, [dispatch, history, userInfo, user])

  return (
    <>
      {message && <Announcement variant='danger'>{message}</Announcement>}
      {error && <Announcement variant='danger'>{error}</Announcement>}
      {loading ? (
        <Loader />
      ) : (
        <Row className='justify-content-center d-flex bg-light rounded shadow'>
          <Col md={5} className='mt-5 pt-4'>
            <div
              className='mb-5'
              style={{
                border: '5px solid red',
                borderRadius: '50%',
                width: '25rem',
                height: '25.6rem',
              }}
            >
              <div className='text-center a'>
                <Image
                  style={{
                    width: '25rem',
                    height: '25rem',
                  }}
                  src={avatar ? avatar : userInfo.avatar}
                  className='rounded-circle shadow'
                  fluid
                />
              </div>
            </div>
          </Col>
          <Col md={6} className='pt-4 pb-4 mr-1  '>
            <h2 className='text-center'>User Profile</h2>
            <Form onSubmit={submitHandler} className='pl-4 pr-4 pt-3'>
              <Form.Group controlId='name'>
                <Form.Label as='p' className='mb-1'>
                  Name
                </Form.Label>
                <Form.Control
                  className='border border-grey'
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label as='p' className='mb-1'>
                  Email address
                </Form.Label>
                <Form.Control
                  className='border border-grey'
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label as='p' className='mb-1'>
                  Image
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

              <Form.Group controlId='password'>
                <Form.Label as='p' className='mb-1'>
                  Password
                </Form.Label>
                <Form.Control
                  className='border border-grey'
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label as='p' className='mb-1'>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  className='border border-grey'
                  type='password'
                  placeholder='Enter Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div>
                <Button
                  type='submit'
                  variant='outline-success'
                  className='btn-block'
                  style={{ fontSize: '1rem', letterSpacing: '0.25rem' }}
                >
                  Update
                </Button>
              </div>
              <ToastContainer />
            </Form>{' '}
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProfileScreen
